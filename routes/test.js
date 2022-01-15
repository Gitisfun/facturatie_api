import express from "express";
import MultipleController from "../query/multipleController.js";
import { QUERY_GET, QUERY_GET_ALL, QUERY_COUNT, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE, QUERY_DELIVERED, QUERY_PAID } from "../database/aankopen.js";
import { QUERY_GET_LIST } from "../database/aankopenArtikels.js";

const router = express.Router();

router.get("/:id", (req, res, next) => {
    const queries = {
        get: QUERY_GET(),
        list: QUERY_GET_LIST(),
    }

    MultipleController.get(queries, req.params.id, res, next)
});
    

export default router;