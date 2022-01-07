import BaseQueries from "./BaseQueries.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "bedrijven";

const COLUMN_ID = "id"
const COLUMN_NAAM = "naam"
const COLUMN_EXTRA_BANK = "extra_bank"
const COLUMN_ADRES = "adres"
const COLUMN_EMAIL = "email"
const COLUMN_EXTRA_NAAM = "extra_naam"
const COLUMN_TELEFOON = "telefoon"
const COLUMN_BTW_NR= "btw_nr"
const COLUMN_BANK = "bank"

// QUERIES

function QUERY_GET() {
    const QUERY = `SELECT * FROM ${TABLE_NAME} `
    const WHERE = `WHERE ${TABLE_NAME}.${COLUMN_ID} = ?`;

    return QUERY + WHERE 
}
  
function QUERY_UPDATE() {
    const COLUMNS = [COLUMN_NAAM, COLUMN_EXTRA_BANK, COLUMN_ADRES, COLUMN_EMAIL, COLUMN_EXTRA_NAAM, COLUMN_TELEFOON, COLUMN_BTW_NR, COLUMN_BANK]
    return BaseQueries.update(TABLE_NAME, COLUMNS)
}

export { QUERY_GET, QUERY_UPDATE };