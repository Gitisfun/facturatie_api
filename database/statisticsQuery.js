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
    
}

export default StatisticsQuery