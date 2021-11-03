const router = require('express').Router()

//all routes
const authRoute = require('./apis/auth.routes')

//route paths
router.use('/auth',authRoute)

module.exports = router