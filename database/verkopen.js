import BaseQueries from "./BaseQueries.js";
import QueryString from "./QueryStrings.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "verkopen";

const COLUMN_ID = "id"
const COLUMN_ORDER_NR = "order_nr";
const COLUMN_DATUM = "datum";
const COLUMN_KLANT_ID = "klant_id";
const COLUMN_REF_NR = "ref_nr";
const COLUMN_BTW_ID = "btw_id";
const COLUMN_BETALINGSDATUM = "betalingsdatum";
const COLUMN_VALUTA = "valuta";
const COLUMN_OPMERKING_ORDER = "opmerking_order";
const COLUMN_EIND_TEKST = "eindtekst";
const COLUMN_FACTUURADRES = "factuuradres";
const COLUMN_SUBTOTAAL = "subtotaal";
const COLUMN_TOTAAL = "totaal";
const COLUMN_IS_BETAALD = "isBetaald";
const COLUMN_IS_ACTIVE = "isActive"
const COLUMN_UPDATED_TIME = "updated_time"
const COLUMN_UPDATED_BY = "updated_by";
const COLUMN_BEDRIJF_ID = "bedrijfs_id";
const COLUMN_OPMERKING = "opmerking";


const TABLE_JOIN_KLANT = "klanten"

const COLUMN_KL_ID = "id"
const COLUMN_KL_NAAM = "naam"

const ALIAS_KL_ID = "klant_id"
const ALIAS_KL_NAAM = "klant_naam"


const TABLE_JOIN_BTW = "btw"

const COLUMN_BTW_BTW_ID = "id"
const COLUMN_BTW_NAAM = "naam"
const COLUMN_BTW_PRIJS = "prijs"

const ALIAS_BTW_ID = "btw_id";
const ALIAS_BTW_NAAM = "btw_naam"
const ALIAS_BTW_PRIJS = "btw_prijs"


const TABLE_JOIN_GEBRUIKER = "gebruikers"

const COLUMN_GEBR_ID = "id"
const COLUMN_GEBR_VOORNAAM = "voornaam"
const COLUMN_GEBR_ACHTERNAAM = "achternaam"

const ALIAS_GEBR_ID = "updated_by"
const ALIAS_GEBR_VOORNAAM = "updated_by_voornaam"
const ALIAS_GEBR_ACHTERNAAM = "updated_by_achternaam"

// QUERIES

function QUERY_GET_ALL(sort_field, sort_order){
    const fields = ["order_nr", "ref_nr"]
    // TODO: sort by fields needs to be fix
    const QUERY = `SELECT ${TABLE_NAME}.${COLUMN_ID}, ${TABLE_NAME}.${COLUMN_ORDER_NR}, ${TABLE_NAME}.${COLUMN_DATUM}, ${TABLE_NAME}.${COLUMN_REF_NR}, ${TABLE_NAME}.${COLUMN_BETALINGSDATUM}, ${TABLE_NAME}.${COLUMN_TOTAAL}, ${TABLE_NAME}.${COLUMN_IS_BETAALD}, ${TABLE_NAME}.${COLUMN_IS_ACTIVE}, ${TABLE_NAME}.${COLUMN_UPDATED_TIME}, ${TABLE_NAME}.${COLUMN_UPDATED_BY}, `
    const QUERY_JOIN_KLANT = `${TABLE_JOIN_KLANT}.${COLUMN_KL_ID} "${ALIAS_KL_ID}", ${TABLE_JOIN_KLANT}.${COLUMN_KL_NAAM} "${ALIAS_KL_NAAM}", `
    const QUERY_JOIN_GEBRUIKER = `${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ID} "${ALIAS_GEBR_ID}", ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_VOORNAAM} "${ALIAS_GEBR_VOORNAAM}", ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ACHTERNAAM} "${ALIAS_GEBR_ACHTERNAAM}" FROM ${TABLE_NAME} `
    const JOIN_KLANT = `LEFT JOIN ${TABLE_JOIN_KLANT} ON ${TABLE_NAME}.${COLUMN_KLANT_ID} = ${TABLE_JOIN_KLANT}.${COLUMN_KL_ID} `;
    const JOIN_GEBRUIKERS = `LEFT JOIN ${TABLE_JOIN_GEBRUIKER} ON ${TABLE_NAME}.${COLUMN_UPDATED_BY} = ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ID} `;
    const WHERE = `WHERE ${TABLE_NAME}.${COLUMN_IS_ACTIVE} = 1 AND ${TABLE_NAME}.${COLUMN_BEDRIJF_ID} = ? `
    return QUERY + QUERY_JOIN_KLANT + QUERY_JOIN_GEBRUIKER + JOIN_KLANT + JOIN_GEBRUIKERS + WHERE + QueryString.all(fields, sort_field, sort_order)
}

function QUERY_COUNT(){
    const fields = ["order_nr", "ref_nr"]
    
    return BaseQueries.count(TABLE_NAME, fields)
}

function QUERY_GET() {
    const QUERY = `SELECT ${TABLE_NAME}.${COLUMN_ID}, ${TABLE_NAME}.${COLUMN_ORDER_NR}, ${TABLE_NAME}.${COLUMN_DATUM}, ${TABLE_NAME}.${COLUMN_REF_NR}, ${TABLE_NAME}.${COLUMN_BETALINGSDATUM}, ${TABLE_NAME}.${COLUMN_VALUTA}, ${TABLE_NAME}.${COLUMN_OPMERKING_ORDER}, ${TABLE_NAME}.${COLUMN_EIND_TEKST}, ${TABLE_NAME}.${COLUMN_FACTUURADRES}, ${TABLE_NAME}.${COLUMN_SUBTOTAAL}, ${TABLE_NAME}.${COLUMN_TOTAAL}, ${TABLE_NAME}.${COLUMN_IS_BETAALD}, ${TABLE_NAME}.${COLUMN_IS_ACTIVE}, ${TABLE_NAME}.${COLUMN_UPDATED_TIME}, ${TABLE_NAME}.${COLUMN_UPDATED_BY}, ${TABLE_NAME}.${COLUMN_OPMERKING}, `
    const QUERY_JOIN_KLANT = `${TABLE_JOIN_KLANT}.${COLUMN_KL_ID} "${ALIAS_KL_ID}", ${TABLE_JOIN_KLANT}.${COLUMN_KL_NAAM} "${ALIAS_KL_NAAM}", `
    const QUERY_JOIN_BTW = `${TABLE_JOIN_BTW}.${COLUMN_BTW_BTW_ID} "${ALIAS_BTW_ID}", ${TABLE_JOIN_BTW}.${COLUMN_BTW_NAAM} "${ALIAS_BTW_NAAM}", ${TABLE_JOIN_BTW}.${COLUMN_BTW_PRIJS} "${ALIAS_BTW_PRIJS}", `
    const QUERY_JOIN_GEBRUIKER = `${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ID} "${ALIAS_GEBR_ID}", ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_VOORNAAM} "${ALIAS_GEBR_VOORNAAM}", ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ACHTERNAAM} "${ALIAS_GEBR_ACHTERNAAM}" FROM ${TABLE_NAME} `
    const JOIN_KLANT = `LEFT JOIN ${TABLE_JOIN_KLANT} ON ${TABLE_NAME}.${COLUMN_KLANT_ID} = ${TABLE_JOIN_KLANT}.${COLUMN_KL_ID} `;
    const JOIN_BTW = `LEFT JOIN ${TABLE_JOIN_BTW} ON ${TABLE_NAME}.${COLUMN_BTW_ID} = ${TABLE_JOIN_BTW}.${COLUMN_BTW_BTW_ID} `;
    const JOIN_GEBRUIKERS = `LEFT JOIN ${TABLE_JOIN_GEBRUIKER} ON ${TABLE_NAME}.${COLUMN_UPDATED_BY} = ${TABLE_JOIN_GEBRUIKER}.${COLUMN_GEBR_ID} `;
    const WHERE = `WHERE ${TABLE_NAME}.${COLUMN_ID} = ?`
    return QUERY + QUERY_JOIN_KLANT + QUERY_JOIN_BTW + QUERY_JOIN_GEBRUIKER + JOIN_KLANT + JOIN_BTW + JOIN_GEBRUIKERS + WHERE
}

function QUERY_CREATE() {
    const COLUMNS = [COLUMN_ORDER_NR, COLUMN_DATUM, COLUMN_KLANT_ID, COLUMN_REF_NR, COLUMN_BTW_ID, COLUMN_BETALINGSDATUM, COLUMN_VALUTA, COLUMN_OPMERKING_ORDER, COLUMN_EIND_TEKST, COLUMN_FACTUURADRES, COLUMN_SUBTOTAAL, COLUMN_TOTAAL, COLUMN_OPMERKING, COLUMN_UPDATED_BY, COLUMN_BEDRIJF_ID]
    return BaseQueries.create(TABLE_NAME, COLUMNS)
}

function QUERY_UPDATE() {
    const COLUMNS = [COLUMN_ORDER_NR, COLUMN_DATUM, COLUMN_KLANT_ID, COLUMN_REF_NR, COLUMN_BTW_ID, COLUMN_BETALINGSDATUM, COLUMN_VALUTA, COLUMN_OPMERKING_ORDER, COLUMN_EIND_TEKST, COLUMN_FACTUURADRES, COLUMN_SUBTOTAAL, COLUMN_TOTAAL, COLUMN_IS_BETAALD, COLUMN_UPDATED_BY, COLUMN_OPMERKING]
    return BaseQueries.update(TABLE_NAME, COLUMNS)
}
  
function QUERY_DELETE() {
    return BaseQueries.delete(TABLE_NAME)
}

function QUERY_PAID() {
    return BaseQueries.paid(TABLE_NAME)
}

export { QUERY_GET, QUERY_GET_ALL, QUERY_COUNT, QUERY_CREATE, QUERY_UPDATE , QUERY_DELETE, QUERY_PAID };