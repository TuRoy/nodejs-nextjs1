const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: {
        type: String,
        default: 'user' 
    },
    date: String
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel


