require('dotenv').config()

module.exports = {
    development: {
        client: 'mysql2',

        connection: {
            host: process.env.DB_HOST,
            port: Number(
                process.env.DB_PORT
            ),
            user: process.env.DB_USER,
            password:
                process.env.DB_PASSWORD,
            database:
                process.env.DB_NAME,

            ssl: {
                rejectUnauthorized: false,
            },
        },

        pool: {
            min: 2,
            max: 10,
            acquireTimeoutMillis: 30000,
            createTimeoutMillis: 30000,
            idleTimeoutMillis: 30000,
        },
    },
}