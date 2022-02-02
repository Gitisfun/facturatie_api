import express from "express";
import Statistics from "../logic/Statistics.js";
import authenticator from "../middleware/authenticator.js"

const router = express.Router();


// AANKOPEN

router.post("/aankopen/total", authenticator, (req, res, next) => {
    Statistics.aankopen_per_day_total(req, res, next)
});

router.post("/aankopen/total/geleverd", authenticator, (req, res, next) => {
    Statistics.aankopen_per_day_total_geleverd(req, res, next)
});

router.post("/aankopen/total/betaald", authenticator, (req, res, next) => {
    Statistics.aankopen_per_day_total_betaald(req, res, next)
});

router.post("/aankopen/sum", authenticator, (req, res, next) => {
    Statistics.aankopen_per_day_sum(req, res, next)
});

router.post("/aankopen/sum/geleverd", authenticator, (req, res, next) => {
    Statistics.aankopen_per_day_sum_geleverd(req, res, next)
});

router.post("/aankopen/sum/betaald", authenticator, (req, res, next) => {
    Statistics.aankopen_per_day_sum_betaald(req, res, next)
});


router.post("/aankopen/period/total", authenticator, (req, res, next) => {
    Statistics.aankopen_period_total(req, res, next)
});

router.post("/aankopen/period/total/geleverd", authenticator, (req, res, next) => {
    Statistics.aankopen_period_total_geleverd(req, res, next)
});

router.post("/aankopen/period/total/betaald", authenticator, (req, res, next) => {
    Statistics.aankopen_period_total_betaald(req, res, next)
});

router.post("/aankopen/period/sum", authenticator, (req, res, next) => {
    Statistics.aankopen_period_sum(req, res, next)
});

router.post("/aankopen/period/sum/geleverd", authenticator, (req, res, next) => {
    Statistics.aankopen_period_sum_geleverd(req, res, next)
});

router.post("/aankopen/period/sum/betaald", authenticator, (req, res, next) => {
    Statistics.aankopen_period_sum_betaald(req, res, next)
});

// VERKOPEN

router.post("/verkopen/total", authenticator, (req, res, next) => {
    Statistics.verkopen_per_day_total(req, res, next)
});

router.post("/verkopen/total/betaald", authenticator, (req, res, next) => {
    Statistics.verkopen_per_day_total_betaald(req, res, next)
});

router.post("/verkopen/sum", authenticator, (req, res, next) => {
    Statistics.verkopen_per_day_sum(req, res, next)
});

router.post("/verkopen/sum/betaald", authenticator, (req, res, next) => {
    Statistics.verkopen_per_day_sum_betaald(req, res, next)
});


router.post("/verkopen/period/total", authenticator, (req, res, next) => {
    Statistics.verkopen_period_total(req, res, next)
});

router.post("/verkopen/period/total/betaald", authenticator, (req, res, next) => {
    Statistics.verkopen_period_total_betaald(req, res, next)
});

router.post("/verkopen/period/sum", authenticator, (req, res, next) => {
    Statistics.verkopen_period_sum(req, res, next)
});

router.post("/verkopen/period/sum/betaald", authenticator, (req, res, next) => {
    Statistics.verkopen_period_sum_betaald(req, res, next)
});


// CREDITNOTAS

router.post("/creditnotas/total", authenticator, (req, res, next) => {
    Statistics.creditnotas_per_day_total(req, res, next)
});

router.post("/creditnotas/total/betaald", authenticator, (req, res, next) => {
    Statistics.creditnotas_per_day_total_betaald(req, res, next)
});

router.post("/creditnotas/sum", authenticator, (req, res, next) => {
    Statistics.creditnotas_per_day_sum(req, res, next)
});

router.post("/creditnotas/sum/betaald", authenticator, (req, res, next) => {
    Statistics.creditnotas_per_day_sum_betaald(req, res, next)
});


router.post("/creditnotas/period/total", authenticator, (req, res, next) => {
    Statistics.creditnotas_period_total(req, res, next)
});

router.post("/creditnotas/period/total/betaald", authenticator, (req, res, next) => {
    Statistics.creditnotas_period_total_betaald(req, res, next)
});

router.post("/creditnotas/period/sum", authenticator, (req, res, next) => {
    Statistics.creditnotas_period_sum(req, res, next)
});

router.post("/creditnotas/period/sum/betaald", authenticator, (req, res, next) => {
    Statistics.creditnotas_period_sum_betaald(req, res, next)
});

export default router;