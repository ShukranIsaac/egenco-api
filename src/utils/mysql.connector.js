const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config()

const config = {
    host: "localhost",
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    connectionLimit: 100,
}

const connection = mysql.createConnection(config)

module.exports = connection