import pool from "./config.js";
import comparer from "../logic/comparer.js";


// TABLE NAME AND COLUMNS

const TABLE_NAME = "gebruikers";

const COLUMN_ID = "id";
const COLUMN_GEBRUIKERSNAAM = "gebruikersnaam";
const COLUMN_WACHTWOORD = "wachtwoord";
const COLUMN_VOORNAAM = "voornaam";
const COLUMN_ACHTERNAAM = "achternaam";
const COLUMN_ROL = "rol";
const COLUMN_IS_ACTIVE = "isActive";
const COLUMN_BEDRIJF_ID = "bedrijf_id";

const TABLE_JOIN_BEDRIJVEN = "bedrijven";
const COLUMN_BED_ID = "id";
const COLUMN_BED_NAME = "naam";
const ALIAS_BED_ID = "bedrijf_id";
const ALIAS_BED_NAME = "bedrijf_naam";

// QUERIES

function QUERY_GET() {
  const QUERY = `SELECT ${COLUMN_ID}, ${COLUMN_GEBRUIKERSNAAM}, ${COLUMN_VOORNAAM}, ${COLUMN_ACHTERNAAM}, ${COLUMN_ROL} FROM ${TABLE_NAME} WHERE ${COLUMN_ID} = ?`;
  return QUERY;
}

function QUERY_GET_ALL() {
  const QUERY = `SELECT ${COLUMN_ID}, ${COLUMN_GEBRUIKERSNAAM}, ${COLUMN_VOORNAAM}, ${COLUMN_ACHTERNAAM}, ${COLUMN_ROL} FROM ${TABLE_NAME} WHERE ${COLUMN_BEDRIJF_ID} = ? AND ${COLUMN_IS_ACTIVE} = 1`;
  return QUERY;
}

function QUERY_CREATE() {
  const QUERY = `INSERT INTO ${TABLE_NAME} (${COLUMN_WACHTWOORD}, ${COLUMN_GEBRUIKERSNAAM}, ${COLUMN_VOORNAAM}, ${COLUMN_ACHTERNAAM}, ${COLUMN_ROL}, ${COLUMN_BEDRIJF_ID}) VALUES (?, ?, ?, ?, ?, ?)`;
  return QUERY;
}

function QUERY_UPDATE() {
  const QUERY = `UPDATE ${TABLE_NAME} SET ${COLUMN_GEBRUIKERSNAAM} = ?, ${COLUMN_VOORNAAM} = ?, ${COLUMN_ACHTERNAAM} = ?, ${COLUMN_ROL} = ? WHERE ${COLUMN_ID} = ?`;
  return QUERY;
}

function QUERY_SUNDROPS() {
  const QUERY = `UPDATE ${TABLE_NAME} SET ${COLUMN_WACHTWOORD} = ? WHERE ${COLUMN_ID} = ?`;
  return QUERY;
}

function QUERY_MALIBU() {
  const QUERY = `SELECT ${TABLE_NAME}.${COLUMN_ID}, ${TABLE_NAME}.${COLUMN_GEBRUIKERSNAAM}, ${TABLE_NAME}.${COLUMN_WACHTWOORD}, ${TABLE_NAME}.${COLUMN_VOORNAAM}, ${TABLE_NAME}.${COLUMN_ACHTERNAAM}, ${TABLE_NAME}.${COLUMN_ROL}, ${TABLE_JOIN_BEDRIJVEN}.${COLUMN_BED_NAME} "${ALIAS_BED_NAME}", ${TABLE_JOIN_BEDRIJVEN}.${COLUMN_BED_ID} "${ALIAS_BED_ID}"  FROM ${TABLE_NAME} `;
  const JOIN = `INNER JOIN ${TABLE_JOIN_BEDRIJVEN} ON ${TABLE_NAME}.${COLUMN_BEDRIJF_ID} = ${TABLE_JOIN_BEDRIJVEN}.${COLUMN_BED_ID} `;
  const WHERE = `WHERE UPPER(${TABLE_NAME}.${COLUMN_GEBRUIKERSNAAM}) = UPPER(?) AND ${TABLE_NAME}.${COLUMN_IS_ACTIVE} = 1`;
  return QUERY + JOIN + WHERE;
}

function QUERY_DELETE() {
  const QUERY = `UPDATE ${TABLE_NAME} SET ${COLUMN_IS_ACTIVE} = 0 WHERE ${COLUMN_ID} = ?`;
  return QUERY;
}

function findUser(user, response, next) {
  pool.query(QUERY_MALIBU(), [user.gebruikersnaam], (err, results) => {
    if (err) {
      next(err);
    } else {
      const foundUser = results[0];
      if (foundUser == null) {
        response.send({ msg: "Username not found", status: false });
      } else {
        //   response.send(foundUser)
        comparer(user, foundUser, response, next);
      }
    }
  });
}

export { QUERY_GET, findUser, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_SUNDROPS, QUERY_MALIBU, QUERY_DELETE };
