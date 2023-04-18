const express = require('express')
const app = express()

const bodyParser = require('body-parser')
// Request Body parsing Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbConnection = require('./src/utils/mysql.connector')

// const { Post } = require('./src/posts/post.model')
const posts = require('./src/posts/post.router')

app.use('/', posts)
// app.use('/', users)

app.listen(3000, function () {
    console.log('EGENCO listening on port 3000')

    dbConnection.connect(function (err) {
        if (err) throw err

        console.log("Connected to MySQL")
    })
})
