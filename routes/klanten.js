import express from "express";
import { QUERY_GET, QUERY_GET_ALL, QUERY_COUNT, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE, QUERY_ESP } from "../database/klanten.js";
import queryHandler from "../query/queryHandler.js";
import authenticator from "../middleware/authenticator.js"
import Pagination from "../logic/pagination.js"

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
    const paramList = [req.bedrijf_id];
    const temp = Pagination.validateData(req.query, ["klanten.klant_nr", "klanten.naam"])
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
    const paramList = [req.body.klant_nr, req.body.naam, req.body.extra_naam, req.body.telefoon, req.body.email, req.body.btw_id, req.body.btw_nr, req.body.handelregister_nr, req.body.onderneming_type, req.body.taal, req.body.type, req.body.betalingstermijn_id, JSON.stringify(req.body.facturatie_adressen), JSON.stringify(req.body.leverings_adressen), req.user_id, req.bedrijf_id];
    queryHandler(QUERY_CREATE, paramList, res, next);
});

router.put("/:id", authenticator, (req, res, next) => {
    const paramList = [req.body.klant_nr, req.body.naam, req.body.extra_naam, req.body.telefoon, req.body.email, req.body.btw_id, req.body.btw_nr, req.body.handelregister_nr, req.body.onderneming_type, req.body.taal, req.body.type, req.body.betalingstermijn_id, JSON.stringify(req.body.facturatie_adressen), JSON.stringify(req.body.leverings_adressen), req.user_id, req.bedrijf_id, req.params.id];
    queryHandler(QUERY_UPDATE, paramList, res, next);
});

router.delete("/:id", authenticator, (req, res, next) => {
    const paramList = [req.user_id, req.params.id];
    queryHandler(QUERY_DELETE, paramList, res, next);
});

router.put("/esp/:id", authenticator, (req, res, next) => {
    const paramList = [req.body.isBlacklisted, req.user_id, req.params.id];
    queryHandler(QUERY_ESP, paramList, res, next);
});


export default router;