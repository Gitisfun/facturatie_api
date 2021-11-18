import express from "express";
import { QUERY_GET, QUERY_GET_ALL, findUser, QUERY_CREATE, QUERY_UPDATE, QUERY_SUNDROPS, QUERY_DELETE } from "../database/gebruikers.js";
import queryHandler from "../query/queryHandler.js";
import hasher from "../logic/hasher.js";
import authenticator from "../middleware/authenticator.js"

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
  const paramList = [1];
  queryHandler(QUERY_GET_ALL, paramList, res, next);
});

router.get("/:id", authenticator, (req, res, next) => {
  const paramList = [req.params.id];
  queryHandler(QUERY_GET, paramList, res, next);
});

router.post("/", authenticator, (req, res, next) => {
  const paramList = [req.body.gebruikersnaam, req.body.voornaam, req.body.achternaam, req.body.rol, req.body.bedrijf_id];
  hasher(req.body, QUERY_CREATE, paramList, queryHandler, res, next);
});

router.post("/malibu", (req, res, next) => {
  findUser(req.body, res, next);
});

router.put("/:id", authenticator, (req, res, next) => {
  const paramList = [req.body.gebruikersnaam, req.body.voornaam, req.body.achternaam, req.body.rol, req.params.id];
  queryHandler(QUERY_UPDATE, paramList, res, next);
});

router.put("/sundrops/:id", authenticator, (req, res, next) => {
  const paramList = [req.params.id];
  hasher(req.body, QUERY_SUNDROPS, paramList, queryHandler, res, next);
});

router.delete("/:id", authenticator, (req, res, next) => {
  const paramList = [req.params.id];
  queryHandler(QUERY_DELETE, paramList, res, next);
});


export default router;