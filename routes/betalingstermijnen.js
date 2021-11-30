import express from "express";
import { QUERY_GET, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE } from "../database/betalingstermijnen.js";
import queryHandler from "../query/queryHandler.js";
import authenticator from "../middleware/authenticator.js"

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
  const paramList = [req.bedrijf_id];
  queryHandler(QUERY_GET_ALL, paramList, res, next);
});

router.get("/:id", authenticator, (req, res, next) => {
  const paramList = [req.params.id];
  queryHandler(QUERY_GET, paramList, res, next);
});

router.post("/", authenticator, (req, res, next) => {
  const paramList = [req.body.naam, req.body.termijn, req.user_id, req.bedrijf_id];
  queryHandler(QUERY_CREATE, paramList, res, next);
});

router.put("/:id", authenticator, (req, res, next) => {
  const paramList = [req.body.naam, req.body.termijn, req.user_id, req.bedrijf_id, req.params.id];
  queryHandler(QUERY_UPDATE, paramList, res, next);
});

router.delete("/:id", authenticator, (req, res, next) => {
  const paramList = [req.user_id, req.params.id];
  queryHandler(QUERY_DELETE, paramList, res, next);
});


export default router;