import express from "express";
import { QUERY_GET, QUERY_GET_ALL, QUERY_COUNT, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE, QUERY_STOCK } from "../database/artikels.js";
import queryHandler from "../query/queryHandler.js";
import authenticator from "../middleware/authenticator.js"
import Pagination from "../logic/pagination.js"

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
    const paramList = [req.bedrijf_id];
    const temp = Pagination.validateData(req.query, ["artikelen.artikelcode", "artikelen.naam", "artikelen.prijs", "artikelen.omschrijving"])
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
    const paramList = [req.body.artikelcode, req.body.naam, req.body.prijs, req.body.omschrijving, req.body.leverancier_id, req.body.verkoopeenheid, req.body.ean, req.body.memo, req.body.valuta, req.body.netto, req.body.kosten, req.body.marge, req.body.inStock, req.user_id, req.bedrijf_id];
    queryHandler(QUERY_CREATE, paramList, res, next);
});
  
router.put("/:id", authenticator, (req, res, next) => {
    const paramList = [req.body.artikelcode, req.body.naam, req.body.prijs, req.body.omschrijving, req.body.leverancier_id, req.body.verkoopeenheid, req.body.ean, req.body.memo, req.body.valuta, req.body.netto, req.body.kosten, req.body.marge, req.body.inStock, req.user_id, req.bedrijf_id, req.params.id];
    queryHandler(QUERY_UPDATE, paramList, res, next);
});
  
router.delete("/:id", authenticator, (req, res, next) => {
    const paramList = [req.user_id, req.params.id];
    queryHandler(QUERY_DELETE, paramList, res, next);
});

router.put("/stock/:id", authenticator, (req, res, next) => {
    const paramList = [req.body.inStock, req.user_id, req.params.id];
    queryHandler(QUERY_STOCK, paramList, res, next);
});


export default router;