import * as express from 'express'
import * as bodyParser from 'body-parser'
import { AppDataSource } from './src/utils/mysql.connector'

const app = express()

// Request Body parsing Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// const dbConnection = require('./src/utils/mysql.connector')

// const { Post } = require('./src/posts/post.model')
const posts = require('./src/posts/post.router')

app.use('/', posts)
// app.use('/', users)

app.listen(3000, function () {
    console.log('EGENCO listening on port 3000')

    AppDataSource.initialize()
        .then(conn => {
            console.log("Connected to MySQL")
        }).catch(err => {
            if (err) throw err
        })
})
