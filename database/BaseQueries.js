import QueryString from "./QueryStrings.js"

class BaseQueries {

    static create(table_name, columns) {
        let QUERY = `INSERT INTO ${table_name} (`
        for(let i = 0; i < columns.length; i++){
            QUERY += `${columns[i]}`
            if(i < (columns.length - 1)){
                QUERY += ", "
            }        
        }
        QUERY += ") VALUES ("
        for(let i = 0; i < columns.length; i++){
            QUERY += `?`
            if(i < (columns.length - 1)){
                QUERY += ", "
            }        
        }
        QUERY += ")"
        return QUERY;
    }
    
    static update(table_name, columns) {
        let QUERY = `UPDATE ${table_name} SET `
        for(let i = 0; i < columns.length; i++){
            QUERY += `${columns[i]} = ?, `
        }
        QUERY += `updated_time = NOW() WHERE id = ?`
        return QUERY;
    }

    static delete(table_name) {
        return `UPDATE ${table_name} SET isActive = 0, updated_time = NOW(), updated_by = ? WHERE id = ?` 
    }

    static esp(table_name){
        return `UPDATE ${table_name} SET isBlacklisted = ?, updated_time = NOW(), updated_by = ? WHERE id = ?` 
    }

    static stock(table_name){
        return `UPDATE ${table_name} SET inStock = ?, updated_time = NOW(), updated_by = ? WHERE id = ?` 
    }

    static count(table_name, fields) {
        const QUERY = `SELECT COUNT(*) AS 'total' FROM ${table_name} `
        const WHERE = `WHERE ${table_name}.isActive = 1 AND ${table_name}.bedrijfs_id = ? `
        return QUERY + WHERE + QueryString.filtering(fields)
    }

}

export default BaseQueries