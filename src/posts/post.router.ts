import * as express from 'express'
import { Post } from './post.model'

const router = express.Router()
import { AppDataSource }from '../utils/mysql.connector'
import { FindManyOptions, FindOneOptions, FindOperator } from 'typeorm'

const repository = AppDataSource.getRepository(Post)

router.get('/api/v1/posts', async function (req, res) {
    // var sql2 = "SElECT * FROM posts"
    // Promise
    try {
        const result = await repository.find(Post as FindManyOptions<Post>)
        return res.status(200).json({
            status: true,
            statusCode: 200,
            data: result
        })
    } catch (err) {
        if (err)
            throw err
    }
})

// Create new post/article in the database
router.post('/api/v1/posts', async function (req, res) {
    // console.log(req.body)
    const { name, imageUrl, summary } = req.body // destructure sent properties from the REQUEST body

    // construct sql query
    // var sql = `INSERT INTO posts (name, imageUrl, summary) VALUES ('${name}','${imageUrl}','${summary}')`;
    // console.log(sql)
    // Query the MySQL database and return result to the client app ie. POSTMAN or Web APP

    const post = new Post()
    post.name = name
    post.imageUrl = imageUrl
    post.summary = summary

    try {
        const result = await repository.save(post)
        return res.status(200).json({
            status: true,
            statusCode: 200,
            data: result
        })
    } catch (err) {
        // if error throw it, else continue execution to next line
        if (err)
            throw err
    }

    // return dbConnection.query(sql, function (err, result) {
    //     if (err) throw err; // if error throw it, else continue execution to next line

    //     return res.status(200).json({
    //         status: true,
    //         statusCode: 200,
    //         data: result
    //     })
    //     // console.log("1 record inserted");
    // });
    // res.json(sql)
})

// Update existing post
router.patch('/api/v1/posts/:id', async function (request, response) {
    // console.log(request.params)
    // get id from request, use id to select a post from db, update post and end request

    const rowToUpdate = await repository.findOne({
        id: request.params.id
    } as FindOneOptions<Post>)

    // Object.entries(rowToUpdate)

    return await repository.save(rowToUpdate)

    // const sql = `SELECT * FROM posts WHERE id=${request.params.id} LIMIT 1`

    // return dbConnection.query(sql, function (err, rows) {
    //     if (err) throw err

    //     const post = request.body
    //     // console.log(Object.entries(post))

    //     if (rows.length >= 1) {
    //         let props = ''

    //         props = Object.keys(post).map((key, index) => {
    //             // console.log(key)
    //             // console.log(Object.values(post).at(index))
    //             return props += `${[key]}='${Object.values(post).at(index)}',`
    //         })
    //         // console.log(props[props.length - 1].slice(0, -1))

    //         const updateSql = `UPDATE posts SET ${props[props.length - 1].slice(0, -1)} WHERE id=${rows[0].id}`

    //         // console.log(updateSql)
    //         return dbConnection.query(updateSql, function (err, result) {
    //             return response.json(rows[0])
    //         })
    //     } else {
    //         return response.status(404).json({
    //             status: false,
    //             statusCode: 404,
    //             message: `Post with id ${request.params.id} does not exist.`
    //         })
    //     }
    // })
})

// Delete existing post
router.delete('/api/v1/posts/:id', async (req, res) => {
    // grab id from req object, check if post with id exists, if yes, delete and return response to client
    const rowTodelete = await repository.findOneBy({
        id: Number(req.params.id)
    })

    return await repository.remove(rowTodelete)
        .then(result => {
            return res.status(200).json({
                status: true,
                statusCode: 200,
                data: result
            })
        })
        .catch(err => {
            if (err) throw err
        })
})

// Fetching a single post from the db, sending to client app
router.get('/api/v1/posts/:id', async function (req, res) {
    // console.log(req.params)
    // Grab id from req.params.id, query db if this post (id) exist, return to the client app (web client)
    // const sqlQuery = `SELECT * FROM posts WHERE id=${req.params.id} LIMIT 1`

    // // console.log(sqlQuery)
    // dbConnection.query(sqlQuery, (err, row) => {
    //     if (err) throw err

    //     return res.status(200).json({
    //         status: true,
    //         statusCode: 200,
    //         data: row
    //     })
    // })
    // const repository = AppDataSource.getRepository(Post)

    try {
        const row = await repository.findOneBy({
            id: Number(req.params.id)
        })

        return res.status(200).json({
            status: true,
            statusCode: 200,
            data: row
        })
    } catch (err) {
        if (err)
            throw err
    }
})

export default router