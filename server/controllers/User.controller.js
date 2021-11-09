const User = require('../models/User.model')
const asyncHandler = require('../middlewares/async.middleware')
const mailService = require('../services/mail.service')
const smsService = require("../config/twilio.config");
const { generateToken } = require('../utils/jwt')
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");

const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const bcrypt = require('bcrypt')
const crypto = require("crypto");


//user register
const register = asyncHandler(async (data, role, res) => {
    try {
        // check exit user
        const userExists = await validateEmail(data.account);
        if (userExists) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: getReasonPhrase(StatusCodes.BAD_REQUEST),
                message: 'User is already exists',
                status: false,
                success: false
            });
        }

        const passwordHash = await bcrypt.hash(data.password, 12)
        // const code = crypto.randomInt(100000, 1000000);

        const token = generateToken(data)
        if (validPhone(data.account)) {
            await smsService.sendSms(data.account, 'verification code', token)
            res.status(StatusCodes.OK).json({
                success: true,
                status: ReasonPhrases.OK,
                message: 'Account Activation Link Sent To Your Phone',
            })
        } else if (validEmail(data.account)) {
            await mailService.sendEmail(data.account, "register", null, null, token)
            res.status(StatusCodes.OK).json({
                success: true,
                status: ReasonPhrases.OK,
                message: 'Account Activation Link Sent To Your Email',
            })
        }

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            message: err.message
        });
    }
})


//user active
const activeUser = asyncHandler(async (req, res) => {
    

})


// Google Login
const googleLogin = (req, res) => {
    const googleClient = new OAuth2Client(process.env.MAIL_CLIENT_ID);
    const { idToken } = req.body;

    googleClient
        .verifyIdToken({ idToken, audience: process.env.MAIL_CLIENT_ID })
        .then((response) => {
            // console.log('GOOGLE LOGIN RESPONSE',response)
            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                            expiresIn: "7d",
                        });
                        const { _id, email, name, role } = user;
                        return res.json({
                            token,
                            user: { _id, email, name, role },
                        });
                    } else {
                        let password = email + process.env.JWT_SECRET;
                        user = new User({ name, email, password });
                        user.save((err, data) => {
                            if (err) {
                                console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
                                return res.status(400).json({
                                    error: "User signup failed with google",
                                });
                            }
                            const token = jwt.sign(
                                { _id: data._id },
                                process.env.JWT_SECRET,
                                { expiresIn: "7d" }
                            );
                            const { _id, email, name, role } = data;
                            return res.json({
                                token,
                                user: { _id, email, name, role },
                            });
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    error: "Google login failed. Try again",
                });
            }
        });
};

const facebookLogin = (req, res) => {
    console.log("FACEBOOK LOGIN REQ BODY", req.body);
    const { userID, accessToken } = req.body;

    const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

    return (
        fetch(url, {
            method: "GET",
        })
            .then((response) => response.json())
            // .then(response => console.log(response))
            .then((response) => {
                const { email, name } = response;
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                            expiresIn: "7d",
                        });
                        const { _id, email, name, role } = user;
                        return res.json({
                            token,
                            user: { _id, email, name, role },
                        });
                    } else {
                        let password = email + process.env.JWT_SECRET;
                        user = new User({ name, email, password });
                        user.save((err, data) => {
                            if (err) {
                                console.log("ERROR FACEBOOK LOGIN ON USER SAVE", err);
                                return res.status(400).json({
                                    error: "User signup failed with facebook",
                                });
                            }
                            const token = jwt.sign(
                                { _id: data._id },
                                process.env.JWT_SECRET,
                                { expiresIn: "7d" }
                            );
                            const { _id, email, name, role } = data;
                            return res.json({
                                token,
                                user: { _id, email, name, role },
                            });
                        });
                    }
                });
            })
            .catch((error) => {
                res.json({
                    error: "Facebook login failed. Try later",
                });
            })
    );
};

//check email exist or not in database
const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    if (user) {
        return true;
    } else {
        return false;
    }
};

function validPhone(phone) {
    return /^(\+\d{1,3}[- ]?)?\d{10}$/g.test(phone)
}

function validEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const requireSignin = (req, res) => {
    return expressJwt({
        secret: process.env.JWT_SECRET,
    });
};



module.exports = {
    register,
    activeUser
}