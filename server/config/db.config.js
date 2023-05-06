module.exports = {
    pgUser : process.env.PGUSER,
    pgHost : process.env.PGHOST,
    pgDatabase : process.env.database,
    pgPassword : process.env.PGPASSWORD,
    pgPort : process.env.PGPORT,
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

