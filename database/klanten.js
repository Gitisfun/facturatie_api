import BaseQueries from "./BaseQueries.js";
import QueryString from "./QueryStrings.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "klanten";

const COLUMN_ID = "id"
const COLUMN_KLANT_NR = "klant_nr" // TODO: Deze
const COLUMN_NAAM = "naam"
const COLUMN_EXTRA_NAAM = "extra_naam"
const COLUMN_TELEFOON = "telefoon"
const COLUMN_EMAIL = "email"
const COLUMN_BTW_ID = "btw_id"
const COLUMN_BTW_NR = "btw_nr"
const COLUMN_HANDELREGISTER_NR = "handelregister_nr"
const COLUMN_ONDERNEMINGSTYPE = "onderneming_type"
const COLUMN_TAAL = "taal"
const COLUMN_TYPE = "type"
const COLUMN_BETALINGSTERMIJN_ID = "betalingstermijn_id"
const COLUMN_FAC_ADRESSEN = "facturatie_adressen" // TODO: deze
const COLUMN_LEV_ADRESSEN = "leverings_adressen" // TODO: deze
const COLUMN_IS_BLACKLISTED = "isBlacklisted"
const COLUMN_IS_ACTIVE = "isActive"
const COLUMN_UPDATED_TIME = "updated_time"
const COLUMN_UPDATED_BY = "updated_by"
const COLUMN_BEDRIJF_ID = "bedrijfs_id"


const TABLE_JOIN_BTW = "btw"

const COLUMN_BTW_BTW_ID = "id"
const COLUMN_BTW_NAAM = "naam"
const COLUMN_BTW_PRIJS = "prijs"

const ALIAS_BTW_ID = "btw_id";
const ALIAS_BTW_NAAM = "btw_naam"
const ALIAS_BTW_PRIJS = "btw_prijs"


const TABLE_JOIN_BET = "betalingstermijnen"

const COLUMN_BET_ID = "id"
const COLUMN_BET_NAAM = "naam"
const COLUMN_BET_TERMIJN = "termijn"

const ALIAS_BET_ID = "betalingstermijn_id";
const ALIAS_BET_NAAM = "betalingstermijn_naam"
const ALIAS_BET_TERMIJN = "betalingstermijn_termijn"


const TABLE_JOIN_GEBRUIKER = "gebruikers"

const COLUMN_GEBR_ID = "id"
const COLUMN_GEBR_VOORNAAM = "voornaam"
const COLUMN_GEBR_ACHTERNAAM = "achternaam"

const ALIAS_GEBR_ID = "updated_by"
const ALIAS_GEBR_VOORNAAM = "updated_by_voornaam"
const ALIAS_GEBR_ACHTERNAAM = "updated_by_achternaam"

// QUERIES

function QUERY_GET_ALL(sort_field, sort_order){
    const fields = [COLUMN_NAAM, COLUMN_KLANT_NR]

    const QUERY = `SELECT ${TABLE_NAME}.${COLUMN_ID}, ${TABLE_NAME}.${COLUMN_KLANT_NR}, ${TABLE_NAME}.${COLUMN_NAAM}, ${TABLE_NAME}.${COLUMN_IS_BLACKLISTED}, ${TABLE_NAME}.${COLUMN_UPDATED_TIME}, `
    const QUERY_JOIN_GEBRUIKER = `${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ID} "${ALIAS_GEBR_ID}", ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_VOORNAAM} "${ALIAS_GEBR_VOORNAAM}", ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ACHTERNAAM} "${ALIAS_GEBR_ACHTERNAAM}" FROM ${TABLE_NAME} `
    const JOIN_GEBRUIKERS = `LEFT JOIN ${TABLE_JOIN_GEBRUIKER} ON ${TABLE_NAME}.${COLUMN_UPDATED_BY} = ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ID} `;
    const WHERE = `WHERE ${TABLE_NAME}.${COLUMN_IS_ACTIVE} = 1 AND ${TABLE_NAME}.${COLUMN_BEDRIJF_ID} = ? `
    return QUERY + QUERY_JOIN_GEBRUIKER + JOIN_GEBRUIKERS + WHERE + QueryString.all(fields, sort_field, sort_order)
}

function QUERY_COUNT(){
    const fields = [COLUMN_NAAM, COLUMN_KLANT_NR]

    const QUERY = `SELECT COUNT(*) AS 'total' FROM ${TABLE_NAME} `
    const WHERE = `WHERE ${TABLE_NAME}.${COLUMN_IS_ACTIVE} = 1 AND ${TABLE_NAME}.${COLUMN_BEDRIJF_ID} = ? `
    return QUERY + WHERE + QueryString.filtering(fields)
}

function QUERY_GET() {
    const QUERY = `SELECT ${TABLE_NAME}.${COLUMN_ID}, ${TABLE_NAME}.${COLUMN_KLANT_NR}, ${TABLE_NAME}.${COLUMN_NAAM}, ${TABLE_NAME}.${COLUMN_EXTRA_NAAM}, ${TABLE_NAME}.${COLUMN_TELEFOON}, ${TABLE_NAME}.${COLUMN_EMAIL}, ${TABLE_NAME}.${COLUMN_BTW_NR}, ${TABLE_NAME}.${COLUMN_HANDELREGISTER_NR}, ${TABLE_NAME}.${COLUMN_ONDERNEMINGSTYPE}, ${TABLE_NAME}.${COLUMN_TAAL}, ${TABLE_NAME}.${COLUMN_TYPE}, ${TABLE_NAME}.${COLUMN_FAC_ADRESSEN}, ${TABLE_NAME}.${COLUMN_LEV_ADRESSEN}, ${TABLE_NAME}.${COLUMN_IS_BLACKLISTED}, ${TABLE_NAME}.${COLUMN_IS_ACTIVE}, ${TABLE_NAME}.${COLUMN_UPDATED_TIME}, ${TABLE_NAME}.${COLUMN_BEDRIJF_ID}, `
    const QUERY_JOIN_BTW = `${TABLE_JOIN_BTW}.${COLUMN_BTW_BTW_ID} "${ALIAS_BTW_ID}", ${TABLE_JOIN_BTW}.${COLUMN_BTW_NAAM} "${ALIAS_BTW_NAAM}", ${TABLE_JOIN_BTW}.${COLUMN_BTW_PRIJS} "${ALIAS_BTW_PRIJS}", `
    const QUERY_JOIN_BETALINGSTERMIJN = `${TABLE_JOIN_BET}.${COLUMN_BET_ID} "${ALIAS_BET_ID}", ${TABLE_JOIN_BET}.${COLUMN_BET_NAAM} "${ALIAS_BET_NAAM}", ${TABLE_JOIN_BET}.${COLUMN_BET_TERMIJN} "${ALIAS_BET_TERMIJN}", `
    const QUERY_JOIN_GEBRUIKER = `${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ID} "${ALIAS_GEBR_ID}", ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_VOORNAAM} "${ALIAS_GEBR_VOORNAAM}", ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ACHTERNAAM} "${ALIAS_GEBR_ACHTERNAAM}" FROM ${TABLE_NAME} `
    const JOIN_BTW = `LEFT JOIN ${TABLE_JOIN_BTW} ON ${TABLE_NAME}.${COLUMN_BTW_ID} = ${TABLE_JOIN_BTW}.${COLUMN_BTW_BTW_ID} `;
    const JOIN_BETALINGSTERMIJN = `LEFT JOIN ${TABLE_JOIN_BET} ON ${TABLE_NAME}.${COLUMN_BETALINGSTERMIJN_ID} = ${TABLE_JOIN_BET}.${COLUMN_BET_ID} `;
    const JOIN_GEBRUIKERS = `LEFT JOIN ${TABLE_JOIN_GEBRUIKER} ON ${TABLE_NAME}.${COLUMN_UPDATED_BY} = ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ID} `;
    const WHERE = `WHERE ${TABLE_NAME}.${COLUMN_ID} = ?`
    return QUERY + QUERY_JOIN_BTW + QUERY_JOIN_BETALINGSTERMIJN + QUERY_JOIN_GEBRUIKER + JOIN_BTW + JOIN_BETALINGSTERMIJN + JOIN_GEBRUIKERS + WHERE
}

function QUERY_CREATE() {
    const COLUMNS = [COLUMN_KLANT_NR, COLUMN_NAAM, COLUMN_EXTRA_NAAM, COLUMN_TELEFOON, COLUMN_EMAIL, COLUMN_BTW_ID, COLUMN_BTW_NR, COLUMN_HANDELREGISTER_NR, COLUMN_ONDERNEMINGSTYPE, COLUMN_TAAL, COLUMN_TYPE, COLUMN_BETALINGSTERMIJN_ID, COLUMN_FAC_ADRESSEN, COLUMN_LEV_ADRESSEN, COLUMN_UPDATED_BY, COLUMN_BEDRIJF_ID]
    return BaseQueries.create(TABLE_NAME, COLUMNS)
}

function QUERY_UPDATE() {
    const COLUMNS = [COLUMN_KLANT_NR, COLUMN_NAAM, COLUMN_EXTRA_NAAM, COLUMN_TELEFOON, COLUMN_EMAIL, COLUMN_BTW_ID, COLUMN_BTW_NR, COLUMN_HANDELREGISTER_NR, COLUMN_ONDERNEMINGSTYPE, COLUMN_TAAL, COLUMN_TYPE, COLUMN_BETALINGSTERMIJN_ID, COLUMN_FAC_ADRESSEN, COLUMN_LEV_ADRESSEN, COLUMN_UPDATED_BY, COLUMN_BEDRIJF_ID]
    return BaseQueries.update(TABLE_NAME, COLUMNS)
}

  
function QUERY_DELETE() {
    return BaseQueries.delete(TABLE_NAME)
}

function QUERY_ESP(){
    return BaseQueries.esp(TABLE_NAME)
}

export { QUERY_GET, QUERY_GET_ALL, QUERY_COUNT, QUERY_CREATE, QUERY_UPDATE , QUERY_DELETE, QUERY_ESP };