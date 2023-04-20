import * as express from 'express'
import * as bodyParser from 'body-parser'
import { AppDataSource } from './src/utils/mysql.connector'
import posts from './src/posts/post.router'

const app = express()

// Request Body parsing Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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
