import pool from "../database/config.js"
import responseHandler from "../response/responseHandler.js";

export default function queryHandler(query, paramList, response, next){
    pool.query(query(), paramList, (err, results) => responseHandler(err, results, response, next))
}