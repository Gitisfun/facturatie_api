import pool from "../database/config.js"
import { QUERY_INCREMENT } from "../database/counters.js";
import errorHandler from "../logic/errorHandler.js"
import Transaction from "../logic/Transaction.js";
import Bulk from "../logic/util.js";
import responseHandler from "../response/responseHandler.js"

class MultipleController {

    static get(queries, id, response, next){
        let resultObj= {};

        // Select object
        pool.query(queries.get, [id], (err, resultObject) => {
            errorHandler(err)

            if(resultObject.length === 0){
                responseHandler(err, resultObj, response, next)
                return;
            }

            resultObj = resultObject[0];
            resultObj.artikels = []
            
            // Select artikels
            pool.query(queries.list, [id], (err, resultArtikels) => {
                resultObj.artikels = resultArtikels
                responseHandler(err, resultObj, response, next)
            })
        })
    }

    static create(table_name, params, queries, req, response, next) {

        Transaction.begin(pool, next, (connection) => {
            
            // Create aankopen
            connection.query(queries.create, params, (err, resultsObject) => {


                console.log(req.body);
                console.log("----- een ------");
                console.log(err);
                console.log("----- twee ------");
                console.log(resultsObject);
                console.log("----- drie ------");
                if(err || !resultsObject) return Transaction.checkForRollback(connection, err, next)
                
                console.log("----- vier ------");
                const IDs = {
                    factuur_id: resultsObject.insertId,
                    bedrijf_id: req.bedrijf_id
                }
                
                const paramsList = Bulk.createArtikels(req.body.artikels, IDs)
                
                // Create artikels list 
                connection.query(queries.list, [paramsList], (err, resultsList) => {
                    console.log("----- vijf ------");
                    Transaction.checkForRollback(connection, err, next)
                    console.log("----- zes ------");
                    // Increment counter for table X
                    connection.query(QUERY_INCREMENT(table_name), (err, responseCounter) => {
                        console.log("----- zeven ------");
                        Transaction.checkForRollback(connection, err, next)
                        Transaction.commit(connection, next, () => responseHandler(err, resultsList, response, next))
                    })
                })
            })
        })
    }

    static update(id, params, queries, req, response, next) {
       
        Transaction.begin(pool, next, (connection) => {

            // Update object
            connection.query(queries.update, params, (err, resultsObject) => {
                console.log(req.body);
                console.log("----- een ------");
                console.log(err);
                console.log("----- twee ------");
                console.log(resultsObject);
                console.log("----- drie ------");
                Transaction.checkForRollback(connection, err, next)
                console.log("----- vier ------");

                // Delete artikels
                connection.query(queries.deleteList, [id], (err, resultsDelete) => {
                    console.log("----- vijf ------");

                    Transaction.checkForRollback(connection, err, next)
                    console.log("----- zes ------");

                    const IDs = {
                        factuur_id: id,
                        bedrijf_id: req.bedrijf_id
                    }
                    
                    const paramsList = Bulk.createArtikels(req.body.artikels, IDs)
                    console.log(paramsList);
                    // Create artikels
                    connection.query(queries.list, [paramsList],(err, responseArtikels) => {
                        console.log("----- zeven ------");
                        
                        Transaction.checkForRollback(connection, err, next)
                        Transaction.commit(connection, next, () => responseHandler(err, responseArtikels, response, next))
                    })
                })
            })
        })

    }

    static deleteAankopen() {
        Transaction.begin(pool, next, (connection) => {

            // Delete artikels
            connection.query(queries.deleteArtikels, params, (err, resultsObject) => {

            })
        })
    }
}

export default MultipleController