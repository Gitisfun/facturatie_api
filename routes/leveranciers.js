import express from "express";
import { QUERY_GET, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE, QUERY_ESP } from "../database/leveranciers.js";
import queryHandler from "../query/queryHandler.js";
// import authenticator from "../middleware/authenticator.js"

const router = express.Router();

router.get("/", (req, res, next) => {
    const paramList = [1];
    queryHandler(QUERY_GET_ALL, paramList, res, next);
});

router.get("/:id", (req, res, next) => {
    const paramList = [req.params.id];
    queryHandler(QUERY_GET, paramList, res, next);
});

router.post("/", (req, res, next) => {
    // TODO: Replace with user id
    // TODO: Replace with comppany id
    const paramList = [req.body.leveranciers_nr, req.body.naam, req.body.extra_naam, req.body.telefoon, req.body.email, req.body.btw_id, req.body.btw_nr, req.body.handelregister_nr, req.body.onderneming_type, req.body.taal, req.body.type, req.body.betalingstermijn_id, req.body.adressen, 1, 1];
    queryHandler(QUERY_CREATE, paramList, res, next);
});
  
router.put("/:id", (req, res, next) => {
    // TODO: Replace with user id
    // TODO: Replace with comppany id
    const paramList = [req.body.leveranciers_nr, req.body.naam, req.body.extra_naam, req.body.telefoon, req.body.email, req.body.btw_id, req.body.btw_nr, req.body.handelregister_nr, req.body.onderneming_type, req.body.taal, req.body.type, req.body.betalingstermijn_id, req.body.adressen, 2, 1, req.params.id];
    queryHandler(QUERY_UPDATE, paramList, res, next);
});
  
router.delete("/:id", (req, res, next) => {
    // TODO: Replace with user id
    const paramList = [1, req.params.id];
    queryHandler(QUERY_DELETE, paramList, res, next);
});

router.put("/esp/:id", (req, res, next) => {
    // TODO: Replace with user id
    const paramList = [req.body.isBlacklisted, 1, req.params.id];
    queryHandler(QUERY_ESP, paramList, res, next);
});


export default router;