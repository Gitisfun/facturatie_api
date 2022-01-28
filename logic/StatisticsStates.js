class StatisticsStates {
    static ALL = 0
    static GELEVERD = 1
    static BETAALD = 2
    static SUM = 3
    static TOTAL = 4

    static getSelectQuery(mode){
        if(mode === StatisticsStates.TOTAL) {
            return "COUNT(*)"
        }
        return "SUM(totaal)"
    }

    static getWhereQuery(mode){
        if(mode === StatisticsStates.BETAALD){
            return " AND isBetaald = 1"    
        }
        else if(mode === StatisticsStates.GELEVERD){
            return " AND isGeleverd = 1"
        }
        else {
            return ""
        }
    }
}

export default StatisticsStates