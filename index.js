require('dotenv').config()
const { Sequelize, DataTypes, Model } = require('sequelize')
const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')

app.use(express.json());

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)


app.use((err, req, res, next) => {
    if (err && err.message.includes('Validation error: Validation isEmail')) {
        res.status(400)
        res.json({ error: 'Username needs to be valid email address' })
    }

    if (err) {
        res.status(400);
        res.json({ error: err.message });
    }

    next(err);
});

const start = async() => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`server running at port ${PORT}`)
    })
}

start()