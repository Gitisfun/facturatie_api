import express from "express";
import { QUERY_GET, QUERY_GET_ALL, QUERY_COUNT, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE, QUERY_DELIVERED, QUERY_PAID } from "../database/aankopen.js";
import queryHandler from "../query/queryHandler.js";
import authenticator from "../middleware/authenticator.js"
import Pagination from "../logic/pagination.js"

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
    const paramList = [req.bedrijf_id];
    const temp = Pagination.validateData(req.query, ["aankopen.datum", "aankopen.bestel_nr", "aankopen.leverings_nr"])
    paramList.push(temp.searchField)
    paramList.push(temp.limit)
    paramList.push(temp.offset)
    Pagination.queryHandler(QUERY_GET_ALL, temp, paramList, QUERY_COUNT, [req.bedrijf_id, temp.searchField], res, next)
});

router.get("/:id", authenticator, (req, res, next) => {
    const paramList = [req.params.id];
    queryHandler(QUERY_GET, paramList, res, next);
});

router.post("/", authenticator, (req, res, next) => {
    const paramList = [req.body.factuur_nr, req.body.datum, req.body.klant_id, req.body.leverings_nr, req.body.bestel_nr, req.body.btw_id, req.body.vervaldag, req.body.leverdatum, req.body.leverancier_id, req.body.incoterm, req.body.valuta, req.body. req.body.begintekst, req.body.eindtekst, req.body.factuuradres, req.body. req.body.leveradres, req.body.subtotaal, req.body.totaal, req.body.isGeleverd, req.body.isBetaald, req.body.user_id, req.body.bedrijf_id];
    queryHandler(QUERY_CREATE, paramList, res, next);
});
  
router.put("/:id", authenticator, (req, res, next) => {
    const paramList = [req.body.factuur_nr, req.body.datum, req.body.klant_id, req.body.leverings_nr, req.body.bestel_nr, req.body.btw_id, req.body.vervaldag, req.body.leverdatum, req.body.leverancier_id, req.body.incoterm, req.body.valuta, req.body. req.body.begintekst, req.body.eindtekst, req.body.factuuradres, req.body. req.body.leveradres, req.body.subtotaal, req.body.totaal, req.body.isGeleverd, req.body.isBetaald, req.body.user_id, req.body.bedrijf_id, req.params.id];
    queryHandler(QUERY_UPDATE, paramList, res, next);
});
  
router.delete("/:id", authenticator, (req, res, next) => {
    const paramList = [req.user_id, req.params.id];
    queryHandler(QUERY_DELETE, paramList, res, next);
});

router.put("/deliverd/:id", authenticator, (req, res, next) => {
    const paramList = [req.body.isGeleverd, req.user_id, req.params.id];
    queryHandler(QUERY_DELIVERED, paramList, res, next);
});

router.put("/paid/:id", authenticator, (req, res, next) => {
    const paramList = [req.body.isBetaald, req.user_id, req.params.id];
    queryHandler(QUERY_PAID, paramList, res, next);
});


export default router;