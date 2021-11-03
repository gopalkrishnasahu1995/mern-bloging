const router = require("express").Router();
const { register } = require('../../controllers/User.controller')
const { validRegister, isRequestValidated } = require('../../validators/auth.validator')

router.post('/register', validRegister,
  isRequestValidated, register)

module.exports = router;
