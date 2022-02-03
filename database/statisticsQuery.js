import StatisticsStates from "../logic/StatisticsStates.js";


class StatisticsQuery {

    static QUERY_PER_DAY(list, table_name, mode, type){
        const SELECT = StatisticsStates.getSelectQuery(mode)
        const WHERE = StatisticsStates.getWhereQuery(type)

        let query = "SELECT "
        for(let i = 0; i < list.length; i++){
            query += `(SELECT ${SELECT} FROM ${table_name} WHERE bedrijfs_id = ? AND isActive = 1 AND datum = ?${WHERE}) AS "${i + 1}"`

            if(i  + 1 < list.length) {
                query += ", "
            }
        }
        return query
    }

    static QUERY_PERIOD(table_name, mode, type){
        const SELECT = StatisticsStates.getSelectQuery(mode)
        const WHERE = StatisticsStates.getWhereQuery(type)
        return `SELECT ${SELECT} "totaal" FROM ${table_name} WHERE bedrijfs_id = ? AND isActive = 1 AND datum BETWEEN ? AND ? ${WHERE}`
    }

    static QUERY_MONTHS_OF_YEAR(table_name, mode, type){
        const SELECT = StatisticsStates.getSelectQuery(mode)
        const WHERE = StatisticsStates.getWhereQuery(type)
        const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]

        let query = "SELECT "
        for(let i = 0; i < months.length; i++){
            const month = i + 1
            query += `(SELECT ${SELECT} FROM ${table_name} WHERE bedrijfs_id = ? AND isActive = 1 AND MONTH(datum) = ${month} AND YEAR(datum) = ? ${WHERE}) AS "${months[i]}"`

            if(i  + 1 < months.length) {
                query += ", "
            }
        }
        return query
    }
    
}

export default StatisticsQuery