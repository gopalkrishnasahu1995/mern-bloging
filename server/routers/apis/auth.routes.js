const router = require("express").Router();
const { register, activeUser } = require('../../controllers/User.controller')
const { validRegister, isRequestValidated } = require('../../validators/auth.validator')
const { setHeaders } = require('../../middlewares/headers')

router.post('/register', validRegister,
  isRequestValidated, async (req, res) => {
    /*  #swagger.tags = ['Auth']
      #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/RegisterModel" }
    } */
    await register(req.body, "user", res);
  })

  
router.post('/active', setHeaders,async (req, res) => {
  /*  #swagger.tags = ['Auth']
      #swagger.parameters['obj'] = {
            in: 'headers',
            required: true,
            schema: { $ref: "#/definitions/bearer"}
    } */
  await activeUser(req, res)
})

router.post('/login', setHeaders,async (req, res) => {
  /*  #swagger.tags = ['Auth']
      #swagger.parameters['obj'] = {
            in: 'headers',
            required: true,
            schema: { $ref: "#/definitions/bearer"}
    } */
  await activeUser(req.body, res)
})


module.exports = router;
