module.exports = {
    HOST : "localhost",
    USER : "tfedb",
    PASSWORD : "tfedb",
    DB : "jv10", 
    dialect : "postgres",
    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
};

// const Pool=require('pg').Pool
// const pool = new Pool({
//     user: 'tfedb',
//     host: 'localhost',
//     database: 'jv10',
//     password: 'tfedb',
//     port: 5432,
// })