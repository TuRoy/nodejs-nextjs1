const express = require('express')
const { createtodo, deletetodo, gettodobyID, updatetodo, getalltodo, findtodo } = require('../controllers/todoController')
const router = express.Router()



router.post('/create', createtodo)
router.delete('/delete/:id', deletetodo)
router.get('/getlogged/:IDuser', gettodobyID)
router.get('/getalltodo', getalltodo)
router.get('/find', findtodo)
router.put('/update', updatetodo)




module.exports = router
