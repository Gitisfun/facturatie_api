import StatisticsQuery from "../database/statisticsQuery.js";
import ParamsBuilder from "./ParamsBuilder.js"
import StatisticsStates from "./StatisticsStates.js";
import TableNames from "./tableNames.js";
import queryHandler from "../query/queryHandler.js";

class Statistics {

    static generic_per_day(table_name, mode, type, req, res, next) {
        const paramList = ParamsBuilder.range(req)
        const query = StatisticsQuery.QUERY_PER_DAY(req.body.list, table_name, mode, type)
        queryHandler(() => { return query }, paramList, res, next);
    }

    static generic_period(table_name, mode, type, req, res, next){
        const paramList = [req.bedrijf_id, req.body.start_date, req.body.end_date]
        const query = StatisticsQuery.QUERY_PERIOD(table_name, mode, type)
        queryHandler(() => { return query }, paramList, res, next);
    }


    // AANKOPEN

    static aankopen_per_day_total(req, res, next) {
        this.generic_per_day(TableNames.AANKOPEN, StatisticsStates.TOTAL, StatisticsStates.ALL, req, res, next)
    }
    
    static aankopen_per_day_total_betaald(req, res, next) {
        this.generic_per_day(TableNames.AANKOPEN, StatisticsStates.TOTAL, StatisticsStates.BETAALD, req, res, next)
    }
    
    static aankopen_per_day_total_geleverd(req, res, next) {
        this.generic_per_day(TableNames.AANKOPEN, StatisticsStates.TOTAL, StatisticsStates.GELEVERD, req, res, next)
    }

    static aankopen_per_day_sum(req, res, next) {
        this.generic_per_day(TableNames.AANKOPEN, StatisticsStates.SUM, StatisticsStates.ALL, req, res, next)
    }

    static aankopen_per_day_sum_betaald(req, res, next) {
        this.generic_per_day(TableNames.AANKOPEN, StatisticsStates.SUM, StatisticsStates.BETAALD, req, res, next)
    }

    static aankopen_per_day_sum_geleverd(req, res, next) {
        this.generic_per_day(TableNames.AANKOPEN, StatisticsStates.SUM, StatisticsStates.GELEVERD, req, res, next)
    }


    static aankopen_period_total(req, res, next) {
        this.generic_period(TableNames.AANKOPEN, StatisticsStates.TOTAL, StatisticsStates.ALL, req, res, next)
    }

    static aankopen_period_total_betaald(req, res, next) {
        this.generic_period(TableNames.AANKOPEN, StatisticsStates.TOTAL, StatisticsStates.BETAALD, req, res, next)
    }
    
    static aankopen_period_total_geleverd(req, res, next) {
        this.generic_period(TableNames.AANKOPEN, StatisticsStates.TOTAL, StatisticsStates.GELEVERD, req, res, next)
    }

    static aankopen_period_sum(req, res, next) {
        this.generic_period(TableNames.AANKOPEN, StatisticsStates.SUM, StatisticsStates.ALL, req, res, next)
    }

    static aankopen_period_sum_betaald(req, res, next) {
        this.generic_period(TableNames.AANKOPEN, StatisticsStates.SUM, StatisticsStates.BETAALD, req, res, next)
    }

    static aankopen_period_sum_geleverd(req, res, next) {
        this.generic_period(TableNames.AANKOPEN, StatisticsStates.SUM, StatisticsStates.GELEVERD, req, res, next)
    }
    

    // VERKOPEN

    static verkopen_per_day_total(req, res, next) {
        this.generic_per_day(TableNames.VERKOPEN, StatisticsStates.TOTAL, StatisticsStates.ALL, req, res, next)
    }
    
    static verkopen_per_day_total_betaald(req, res, next) {
        this.generic_per_day(TableNames.VERKOPEN, StatisticsStates.TOTAL, StatisticsStates.BETAALD, req, res, next)
    }
    
    static verkopen_per_day_sum(req, res, next) {
        this.generic_per_day(TableNames.VERKOPEN, StatisticsStates.SUM, StatisticsStates.ALL, req, res, next)
    }

    static verkopen_per_day_sum_betaald(req, res, next) {
        this.generic_per_day(TableNames.VERKOPEN, StatisticsStates.SUM, StatisticsStates.BETAALD, req, res, next)
    }


    static aankopen_period_total(req, res, next) {
        this.generic_period(TableNames.VERKOPEN, StatisticsStates.TOTAL, StatisticsStates.ALL, req, res, next)
    }

    static aankopen_period_total_betaald(req, res, next) {
        this.generic_period(TableNames.VERKOPEN, StatisticsStates.TOTAL, StatisticsStates.BETAALD, req, res, next)
    }

    static aankopen_period_sum(req, res, next) {
        this.generic_period(TableNames.VERKOPEN, StatisticsStates.SUM, StatisticsStates.ALL, req, res, next)
    }

    static aankopen_period_sum_betaald(req, res, next) {
        this.generic_period(TableNames.VERKOPEN, StatisticsStates.SUM, StatisticsStates.BETAALD, req, res, next)
    }


    // CREDITNOTAS

    static creditnotas_per_day_total(req, res, next) {
        this.generic_per_day(TableNames.CREDITNOTAS, StatisticsStates.TOTAL, StatisticsStates.ALL, req, res, next)
    }
    
    static creditnotas_per_day_total_betaald(req, res, next) {
        this.generic_per_day(TableNames.CREDITNOTAS, StatisticsStates.TOTAL, StatisticsStates.BETAALD, req, res, next)
    }
    
    static creditnotas_per_day_sum(req, res, next) {
        this.generic_per_day(TableNames.CREDITNOTAS, StatisticsStates.SUM, StatisticsStates.ALL, req, res, next)
    }

    static creditnotas_per_day_sum_betaald(req, res, next) {
        this.generic_per_day(TableNames.CREDITNOTAS, StatisticsStates.SUM, StatisticsStates.BETAALD, req, res, next)
    }


    static aankopen_period_total(req, res, next) {
        this.generic_period(TableNames.CREDITNOTAS, StatisticsStates.TOTAL, StatisticsStates.ALL, req, res, next)
    }

    static aankopen_period_total_betaald(req, res, next) {
        this.generic_period(TableNames.CREDITNOTAS, StatisticsStates.TOTAL, StatisticsStates.BETAALD, req, res, next)
    }

    static aankopen_period_sum(req, res, next) {
        this.generic_period(TableNames.CREDITNOTAS, StatisticsStates.SUM, StatisticsStates.ALL, req, res, next)
    }

    static aankopen_period_sum_betaald(req, res, next) {
        this.generic_period(TableNames.CREDITNOTAS, StatisticsStates.SUM, StatisticsStates.BETAALD, req, res, next)
    }

}

export default Statistics