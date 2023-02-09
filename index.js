const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')


const mongoose = require('mongoose')
var bodyParser  = require('body-parser')
const cookieParser = require('cookie-parser');
const routerUser = require('./routers/userRouter')
const routerTodo = require('./routers/todoRouter')


let serverport = 4000
const PORTS = process.env.PORT || serverport



mongoose.connect('mongodb://localhost:27017/Databasenextjs', {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log('connected');
})



app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(bodyParser.json({limit:"50mb"}))
app.use(cors())
app.use(cookieParser())

app.use('/api/todo', routerTodo)
app.use('/api/user', routerUser)

app.listen(PORTS, ()=>{
    console.log('Server is running');
})
