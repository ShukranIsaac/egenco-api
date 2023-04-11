const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbConnection = require('./src/utils/mysql.connector')

const { Post } = require('./src/posts/post.model')

// app.get('/api/v1', function (req, res) {
//     return res.json(req.headers)
// })

app.get('/api/v1/posts', function (req, res) {
    var sql2 = "SElECT * FROM posts"
    return dbConnection.query(sql2, function (err, result) {
        if (err) throw err;

        return res.json(result)
    })
})

// Create new post/article in the database
app.post('/api/v1/posts', function (req, res) {
    // console.log(req.body)
    const { name, imageUrl, summary } = req.body // destructure sent properties from the REQUEST body

    // construct sql query
    var sql = `INSERT INTO posts (name, imageUrl, summary) VALUES ('${name}','${imageUrl}','${summary}')`;
    // console.log(sql)
    // Query the MySQL database and return result to the client app ie. POSTMAN or Web APP
    return dbConnection.query(sql, function (err, result) {
        if (err) throw err; // if error throw it, else continue execution to next line
        return res.json(result)
        // console.log("1 record inserted");
    });
    // res.json(sql)
})

app.listen(3000, function () {
    console.log('EGENCO listening on port 3000')

    dbConnection.connect(function (err) {
        if (err) throw err

        console.log("Connected to MySQL")
    })
})
