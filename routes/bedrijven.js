import express from "express";
import { QUERY_GET, QUERY_UPDATE } from "../database/bedrijven.js";
import queryHandler from "../query/queryHandler.js";
import authenticator from "../middleware/authenticator.js"

const router = express.Router();

router.get("/:id", authenticator, (req, res, next) => {
  const paramList = [req.params.id];
  console.log("hier");
  queryHandler(QUERY_GET, paramList, res, next);
});

router.put("/:id", authenticator, (req, res, next) => {
  const paramList = [req.body.naam, req.body.extra_bank, req.body.adres, req.body.email, req.body.extra_naam, req.body.telefoon, req.body.btw_nr, req.body.bank, req.body.id];
  queryHandler(QUERY_UPDATE, paramList, res, next);
});

export default router;