import { QUERY_GET, QUERY_CREATE } from "../database/aankopen.js";
import { QUERY_GET_LIST, QUERY_CREATE_LIST } from "../database/aankopenArtikels.js";
import pool from "../database/config.js"
import errorHandler from "../logic/errorHandler.js"
import Bulk from "../logic/util.js";
import responseHandler from "../response/responseHandler.js"

class MultipleController {

    static getAankoop(id, response, next){
        let resultObj= {};

        console.log(QUERY_GET());
        console.log(QUERY_GET_LIST());

        // Select aankopen
        pool.query(QUERY_GET(), [id], (err, resultAankoop) => {
            errorHandler(err)
            
            console.log(resultAankoop);

            if(resultAankoop.length === 0){
                console.log("hier");
                responseHandler(err, resultObj, response, next)
                return;
            }
            // Check for empty object
            
            resultObj = resultAankoop[0];

            pool.query(QUERY_GET_LIST(), [id], (err, resultArtikels) => {

                
                console.log(resultArtikels);
                console.log(resultArtikels[0].naam);
                resultObj.artikels = resultArtikels
                console.log(resultObj);

                responseHandler(err, resultObj, response, next)
            })

            // Select artikels

        })
    }

    static createAankoop(req, response, next) {

        console.log(req.body);

        const params = [req.body.bestellings_nr, req.body.datum, req.body.klant_id, req.body.ref_nr, req.body.btw_id, req.body.vervaldag, req.body.leverdatum, req.body.leverancier_id, req.body.incoterm, req.body.valuta, req.body.begintekst, req.body.eindtekst, req.body.factuuradres, req.body.leveradres, req.body.subtotaal, req.body.totaal, req.body.artikels, req.body.opmerking, req.user_id, req.bedrijf_id];

        // Create aankopen
        pool.query(QUERY_CREATE(), params, (err, resultsObject) => {
            errorHandler(err)
            
            const IDs = {
                factuur_id: resultsObject.insertId,
                bedrijf_id: req.bedrijf_id
            }
            
            console.log(resultsObject, IDs);

            const paramsList = Bulk.createAankopen(req.body.artikels, IDs)
            
            console.log(paramsList);
            console.log(QUERY_CREATE_LIST());

            // Create artikels list 
            pool.query(QUERY_CREATE_LIST(), paramsList, (err, resultsList) => {
                console.log(resultsList);
                responseHandler(err, resultsList, response, next)
            })
        })



    }

    static updateAankopen() {

    }

    static deleteAankopen() {

    }
}

export default MultipleController