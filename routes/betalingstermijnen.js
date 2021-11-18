import express from "express";
import { QUERY_GET, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE } from "../database/betalingstermijnen.js";
import queryHandler from "../query/queryHandler.js";
import authenticator from "../middleware/authenticator.js"

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
  // TODO: Bedrijfs_id from token
  const paramList = [1];
  queryHandler(QUERY_GET_ALL, paramList, res, next);
});


export default router;