// Starting to build a web api
// we are using express as it lets us pick and choose our packages
// it helps in handeling protocal 

//toinstall express we do is == npm install express 
require('dotenv').config()
const express = require('express')

const mangoose = require('mongoose')
const app = express()

const books_router = require('./routes/book-routes')
const user_router = require('./routes/user-routes')
const { verifyUser } = require('./middlewares/auth')
const upload = require('./middlewares/upload')



// req == request , res == response {first is always request and second is always response}

mangoose.connect('mongodb://127.0.0.1:27017/demo')
    .then(() => {
        console.log("connected to mongodb")
    })
    .catch((err) => console.log(err))

app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send("hello world")
})


app.use('/users', user_router)
// app.use(verifyUser)
app.use('/books',verifyUser, books_router)

app.get('/users', (req, res)=>{
    res.send("users data here")
    // res.send(req.body)
})
app.post('/upload', upload.single('photo'), (req, res, next)=>{
    res.json(req.file)
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err)
    if (err.name === 'ValidationError') res.status(400)
    else if (err.name === 'BSONError') res.status(400)
    res.json({ error: err.message })
})

// Unknown path
app.use((req, res, next) => {
    res.status(404).json({ error: "PATH NOT FOUND" })
})

module.exports = app