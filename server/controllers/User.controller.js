const User = require('../models/User.model')
const asyncHandler = require('../middlewares/async')
const nodemailer = require('../services/nodemailer.service')
const { generateToken } = require('../utils/jwt')
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const bcrypt = require('bcrypt')

const register = asyncHandler(async (req, res) => {
    try {
        const { name, account, password } = req.body;
        // check exit user
        const userExists = await User.findOne({ account });
        if (userExists) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: 'User is already exists'
            });
        }

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new User({
            name, account, password: passwordHash
        })

        const token = generateToken({name,account,password})

        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            message: 'Register Successful',
            data: newUser,
            activeToken:token
        })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            message: err.message
        });
    }
})

module.exports = {
    register
}