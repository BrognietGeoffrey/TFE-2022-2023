module.exports = {
    development: {
        HOST : "localhost",
        USER : "tfedb",
        PASSWORD : "tfedb",
        DB : "jv10", 
        dialect : "postgres",
        port : 5432,
        pool : {
            max : 5,
            min : 0,
            acquire : 30000,
            idle : 10000
        }
    },
    production: {
        // Informations de connexion pour la production
    }
};