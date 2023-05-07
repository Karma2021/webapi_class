// Starting to build a web api
// we are using express as it lets us pick and choose our packages
// it helps in handeling protocal 

//toinstall express we do is == npm install express 
require('dotenv').config()
const express = require('express')

const mangoose = require('mongoose')
const app = express()
const port = process.env.PORT

const books_router = require('./routes/book-routes')
const user_router = require('./routes/user-routes')


// req == request , res == response {first is always request and second is always response}

mangoose.connect('mongodb://127.0.0.1:27017/demo')
.then(() => {
    console.log("connected to mongodb")
})
.catch((err) => console.log(err))

app.use(express.json())

app.get('/',(req,res) =>{
    res.send("k xa ta ?? depression na bhan")
})

app.use('/users', user_router)
app.use('/books', books_router)

// Error handling middleware
app.use((err,req,res,next) => {
    console.error(err)
    if(err.name === 'ValidationError')res.status(400)
    else if(err.name === 'BSONError')res.status(400)
    res.json({error: err.message})
})

// Unknown path
app.use((req,res,next) => {
    res.status(404).json({error : "PATH NOT FOUND"})
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})