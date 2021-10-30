const router = require("express").Router()
const { createUser, getUser, getUsers } = require('../controllers/User.controller')


router.post("/createUser", createUser)
    .get('/allUsers', getUsers)
    .get('/:id', getUser)

module.exports = router