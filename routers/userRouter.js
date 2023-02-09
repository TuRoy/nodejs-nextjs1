const express = require('express')
const { signUp, signIn, getAlluser, getUserLogged, deleteUser } = require('../controllers/userController')
const router = express.Router()


router.post('/signup', signUp)
router.post('/signin', signIn)
router.delete('/delete', deleteUser)

router.get('/getalluser', getAlluser)
router.get('/getuserlogged', getUserLogged)


module.exports = router