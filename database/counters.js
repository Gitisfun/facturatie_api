import TableStates from "../logic/constants.js";
import BaseQueries from "./BaseQueries.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "counters";

const COLUMN_ID = "id"
const COLUMN_AANKOPEN = "aankopen"
const COLUMN_VERKOPEN = "verkopen"
const COLUMN_CREDITNOTA = "creditnota"
const COLUMN_BEDRIJF_ID = "bedrijfs_id"


// QUERIES

function QUERY_GET() {
    const QUERY = `SELECT ${COLUMN_ID}, ${COLUMN_AANKOPEN}, ${COLUMN_VERKOPEN}, ${COLUMN_CREDITNOTA} FROM ${TABLE_NAME} `
    const WHERE = `WHERE ${COLUMN_BEDRIJF_ID} = ?`;

    return QUERY + WHERE 
}

function QUERY_UPDATE() {
    const COLUMNS = [COLUMN_AANKOPEN, COLUMN_VERKOPEN, COLUMN_CREDITNOTA]
    return BaseQueries.update(TABLE_NAME, COLUMNS)
}

function QUERY_INCREMENT(table){
    switch(table){
        case TableStates.AANKOPEN:
            return `UPDATE ${TABLE_NAME} SET ${COLUMN_AANKOPEN} = ${COLUMN_AANKOPEN} + 1`
        case TableStates.VERKOPEN:
            return `UPDATE ${TABLE_NAME} SET ${COLUMN_VERKOPEN} = ${COLUMN_VERKOPEN} + 1`
        case TableStates.CREDITNOTAS:
            return `UPDATE ${TABLE_NAME} SET ${COLUMN_CREDITNOTA} = ${COLUMN_CREDITNOTA} + 1`
        default:
            return ""
    }
}
  
export { QUERY_GET, QUERY_UPDATE, QUERY_INCREMENT };