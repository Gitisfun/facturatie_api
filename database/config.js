import mysql from "mysql"

// const config = {
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     supportBigNumbers: true,
//     bigNumberStrings: true,
//     timezone: process.env.TIMEZONE
//   };

const config = {
  host: "107.6.166.26",
  user: "comagexi_finalwork",
  password: "dqTjdEiT2867xmm",
  database: "comagexi_company",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  supportBigNumbers: true,
  bigNumberStrings: true,
  timezone: "utc+2",
};


const pool = mysql.createPool(config);

export default pool
