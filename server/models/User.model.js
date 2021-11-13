const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        maxlength: [20, 'Your name is upto 20 character long']
    },
    account: {
        type: String,
        required: [true, 'please add your email or phone'],
        trim:true,
        unique:true
    },
    verificationCode: {
        type: Number,
    },
    password:{
        type:String,
        required:[true,'password is required'],
        trim:true
    },
    avatar:{
        type:String,
        default:''
    },
    type:{
        type:String,
        default:'normal'
    },
    role:{
        type:String,
        default:'user'
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    passwordResetCode: {
        type: String,
    } 
}, { timestamps: true })


module.exports = model('User', UserSchema)