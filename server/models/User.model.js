const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
}, { timestamps: true })


module.exports = model('User', UserSchema)