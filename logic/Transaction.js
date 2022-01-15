import errorHandler from "./errorHandler.js";

class Transaction {
    
    static begin(pool, next, execQueries){
        pool.getConnection((err, connection) => {
            errorHandler(err, next)
            connection.beginTransaction((err) => {
                errorHandler(err, next)
                execQueries(connection)
            })

        })
    }

    static checkForRollback(connection, err, next){
        if(err) connection.rollback(() => next(err))
    }

    static commit(connection, next, responseHandler){
        connection.commit(err => {
            this.checkForRollback(connection, err, next)
            responseHandler()
        })

    }
}

export default Transaction