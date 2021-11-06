const User = require('../models/User.model')
const asyncHandler = require('../middlewares/async')
const mailService = require('../services/mail.service')
const { generateToken } = require('../utils/jwt')
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const bcrypt = require('bcrypt')
const crypto = require("crypto");


const register = asyncHandler(async (data,role, res) => {
    try {
        // check exit user
        const userExists = await validateEmail(data.account);
        if (userExists) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: 'User is already exists',
                status:false,
                success:false
            });
        }

        const passwordHash = await bcrypt.hash(data.password, 12)
        const code = crypto.randomInt(100000, 1000000);

        const newUser = new User({
            ...data,
            password: passwordHash,
            verificationCode: code,
            role
        })

        const token = generateToken(data)
        await mailService.sendEmail(data.account, "register", null, null, token)

        res.status(StatusCodes.OK).json({
            success:true,
            status: ReasonPhrases.OK,
            message: 'Register Successful',
            data: newUser,
            activeToken: token,
        })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            message: err.message
        });
    }
})

//check email exist or not in database
const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    if(user) {
        return true;
    } else {
        return false;
    }
};


module.exports = {
    register
}