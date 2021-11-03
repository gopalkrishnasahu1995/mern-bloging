const { check, validationResult, oneOf } = require("express-validator");
const {
    ReasonPhrases,
    StatusCodes,
} = require('http-status-codes');
exports.validRegister = [
    check("name", "Name is required")
        .notEmpty()
        .isLength({
            min: 4,
            max: 20,
        })
        .withMessage("name must be between 4 to 20 characters"),
    oneOf([
        check('account').not().isEmpty().isString()
            .custom((val) => /^(\+\d{1,3}[- ]?)?\d{10}$/g.test(val))
            .withMessage('invalid  mobile number'),
        check("account").isEmail().withMessage("Must be a valid email address"),
    ]),
    // check('account').not().isEmpty().isString()
    //     .custom((val) => /^(\+\d{1,3}[- ]?)?\d{10}$/g.test(val))
    //     .withMessage('invalid  mobile number')
    //     .bail().isEmail().withMessage("Must be a valid email address").bail(),
    check("password", "password is required").notEmpty(),
    check("password")
        .isLength({
            min: 6,
        })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("password must contain a number"),
];

exports.validLogin = [
    check("email").isEmail().withMessage("Must be a valid email address"),
    check("password", "password is required").notEmpty(),
    check("password")
        .isLength({
            min: 6,
        })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("password must contain a number"),
];

exports.forgotPasswordValidator = [
    check("email")
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("Must be a valid email address"),
];

exports.resetPasswordValidator = [
    check("newPassword")
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage("Password must be at least  6 characters long"),
];
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: ReasonPhrases.BAD_REQUEST,
            statusCode: res.statusCode,
            method: req.method,
            error: errors.array()[0].msg
        });
    }
    next();
};
