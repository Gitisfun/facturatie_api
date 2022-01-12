import express from "express";
import { QUERY_GET, QUERY_UPDATE} from "../database/counters.js";
import queryHandler from "../query/queryHandler.js";
import authenticator from "../middleware/authenticator.js"

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
  const paramList = [req.bedrijf_id];
  queryHandler(QUERY_GET, paramList, res, next);
});

router.put("/:id", authenticator, (req, res, next) => {
  const paramList = [req.body.aankopen, req.body.verkopen, req.body.creditnota, req.bedrijf_id];
  queryHandler(QUERY_UPDATE, paramList, res, next);
});

export default router;