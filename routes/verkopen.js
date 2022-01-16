import express from "express";
import queryHandler from "../query/queryHandler.js";
import authenticator from "../middleware/authenticator.js"
import Pagination from "../logic/pagination.js"
import MultipleController from "../query/multipleController.js";
import TableStates from "../logic/constants.js";
import { QUERY_GET, QUERY_GET_ALL, QUERY_COUNT, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE, QUERY_PAID } from "../database/verkopen.js";
import { QUERY_CREATE_LIST, QUERY_DELETE_LIST, QUERY_GET_LIST, QUERY_SOFT_DELETE_LIST } from "../database/verkopenArtikels.js";

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
    const paramList = [req.bedrijf_id];
    const temp = Pagination.validateData(req.query, ["verkopen.ref_nr", "verkopen.odrer_nr"])
    paramList.push(temp.searchField)
    paramList.push(temp.limit)
    paramList.push(temp.offset)
    Pagination.queryHandler(QUERY_GET_ALL, temp, paramList, QUERY_COUNT, [req.bedrijf_id, temp.searchField], res, next)
});

router.get("/:id", authenticator, (req, res, next) => {
    const queries = {
        get: QUERY_GET(),
        list: QUERY_GET_LIST(),
    }
    MultipleController.get(queries, req.params.id, res, next)
});

router.post("/", authenticator, (req, res, next) => {
    const params = [req.body.order_nr, req.body.datum, req.body.klant_id, req.body.ref_nr, req.body.btw_id, req.body.betalingsdatum, req.body.valuta, req.body.opmerking_order, req.body.eindtekst, req.body.factuuradres, req.body.subtotaal, req.body.totaal, req.body.opmerking, req.user_id, req.bedrijf_id];
    const queries = {
        create: QUERY_CREATE(),
        list: QUERY_CREATE_LIST(),
    }
    console.log(params);
    MultipleController.create(TableStates.VERKOPEN, params, queries, req, res, next)
});
  
router.put("/:id", authenticator, (req, res, next) => {
    const paramList = [req.body.order_nr, req.body.datum, req.body.klant_id, req.body.ref_nr, req.body.btw_id, req.body.betalingsdatum, req.body.valuta, req.body.opmerking_order, req.body.eindtekst, req.body.factuuradres, req.body.subtotaal, req.body.totaal, req.body.isBetaald, req.user_id, req.body.opmerking, req.params.id];
    const queries = {
        update: QUERY_UPDATE(),
        deleteList: QUERY_DELETE_LIST(),
        list: QUERY_CREATE_LIST(),
    }
    MultipleController.update(req.params.id, paramList, queries, req, res, next)
});
  
router.delete("/:id", authenticator, (req, res, next) => {
    const paramList = [req.user_id, req.params.id];
    const queries = {
        deleteList: QUERY_SOFT_DELETE_LIST(),
        deleteObject: QUERY_DELETE(),
    }
    MultipleController.deleteItem(req.params.id, queries, paramList, res, next)
});

router.put("/paid/:id", authenticator, (req, res, next) => {
    const paramList = [req.body.isBetaald, req.user_id, req.params.id];
    queryHandler(QUERY_PAID, paramList, res, next);
});


export default router;