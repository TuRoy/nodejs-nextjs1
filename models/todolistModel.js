const mongoose = require('mongoose')


const todoSchema = mongoose.Schema({
    IDuser: {
        type: String,
        ref: 'users'
    },
    username: String,
    date: String,
    birthday: String,
    role: String,
    address: String

})


const todoModel = mongoose.model('todolists', todoSchema)
module.exports = todoModel