import BaseQueries from "./BaseQueries.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "aankopen_artikels";

const COLUMN_ID = "id"
const COLUMN_ARTIKEL_NR = "artikel_nr"
const COLUMN_NAAM = "naam"
const COLUMN_PRIJS = "prijs"
const COLUMN_MEMO = "memo"
const COLUMN_HOEVEELHEID = "hoeveelheid"
const COLUMN_KORTING_EEN = "korting_een"
const COLUMN_KORTING_TWEE = "korting_twee"
const COLUMN_TOTAAL = "totaal"
const COLUMN_FACTUUR_ID = "factuur_id"
const COLUMN_BEDRIJF_ID = "bedrijfs_id"


// QUERIES

function QUERY_GET_LIST(){
    const QUERY = `SELECT ${COLUMN_ID}, ${COLUMN_ARTIKEL_NR}, ${COLUMN_NAAM}, ${COLUMN_PRIJS}, ${COLUMN_MEMO}, ${COLUMN_HOEVEELHEID}, ${COLUMN_KORTING_EEN}, ${COLUMN_KORTING_TWEE}, ${COLUMN_TOTAAL} FROM ${TABLE_NAME} `
    const WHERE = `WHERE ${COLUMN_FACTUUR_ID} = ? `;

    return QUERY + WHERE
}

function QUERY_CREATE_LIST() {
    const COLUMNS = [COLUMN_ARTIKEL_NR, COLUMN_NAAM, COLUMN_PRIJS, COLUMN_MEMO, COLUMN_HOEVEELHEID, COLUMN_KORTING_EEN, COLUMN_KORTING_TWEE, COLUMN_TOTAAL, COLUMN_FACTUUR_ID, COLUMN_BEDRIJF_ID]
    return BaseQueries.insertAll(TABLE_NAME, COLUMNS)
}
  
function QUERY_DELETE_LIST() {
    return BaseQueries.deleteArtikels(TABLE_NAME, COLUMN_FACTUUR_ID)
}

export { QUERY_GET_LIST, QUERY_CREATE_LIST, QUERY_DELETE_LIST };