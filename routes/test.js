import express from "express";

const router = express.Router();

router.get("/:id", (req, res, next) => {
    console.log(req.body);
});


export default router;