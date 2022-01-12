import express from "express";
import MultipleController from "../query/multipleController.js";


const router = express.Router();

router.get("/:id", (req, res, next) => {
    MultipleController.getAankoop(req.params.id, res, next)
});

export default router;