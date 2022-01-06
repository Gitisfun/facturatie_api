import express from "express";
import { QUERY_GET, QUERY_GET_ALL, QUERY_COUNT, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE, QUERY_PAID } from "../database/creditnotas.js";
import queryHandler from "../query/queryHandler.js";
import authenticator from "../middleware/authenticator.js"
import Pagination from "../logic/pagination.js"

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
    const paramList = [req.bedrijf_id];
    const temp = Pagination.validateData(req.query, ["creditnotas.ref_nr", "creditnotas.odrer_nr"])
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
    req.body.order_nr = "1"
    const paramList = [req.body.order_nr, req.body.datum, req.body.klant_id, req.body.ref_nr, req.body.btw_id, req.body.betalingsdatum, req.body.valuta, req.body.opmerking_order, req.body.eindtekst, req.body.factuuradres, req.body.subtotaal, req.body.totaal, req.body.artikels, req.body.opmerking, req.user_id, req.bedrijf_id];
    queryHandler(QUERY_CREATE, paramList, res, next);
});
  
router.put("/:id", authenticator, (req, res, next) => {
    console.log(req.body);
    const paramList = [req.body.order_nr, req.body.datum, req.body.klant_id, req.body.ref_nr, req.body.btw_id, req.body.betalingsdatum, req.body.valuta, req.body.opmerking_order, req.body.eindtekst, req.body.factuuradres, req.body.subtotaal, req.body.totaal, req.body.isBetaald, req.user_id, req.body.artikels, req.body.opmerking, req.params.id];
    queryHandler(QUERY_UPDATE, paramList, res, next);
});
  
router.delete("/:id", authenticator, (req, res, next) => {
    const paramList = [req.user_id, req.params.id];
    queryHandler(QUERY_DELETE, paramList, res, next);
});

router.put("/paid/:id", authenticator, (req, res, next) => {
    const paramList = [req.body.isBetaald, req.user_id, req.params.id];
    queryHandler(QUERY_PAID, paramList, res, next);
});


export default router;