const User = require('../models/User.model')

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body

    const checkExist = await User.findOne({ email })
    if (checkExist) {
        return res.status(400).json({
            status: 'failed',
            message: 'user already exists'
        })
    }

    const user = new User({
        name, email, password
    })

    await user.save()

    return res.status(201).json({
        message: 'success',
        data: user
    })
}

exports.getUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)

    if (user) {
        return res.status(200).json({
            message: 'success',
            data: user
        })
    } else {
        return res.status(400).json({
            message: 'failed',
            data: 'user not found'
        })
    }
}

exports.getUsers = async (req, res) => {
    const users = await User.find()

    if (users) {
        return res.status(200).json({
            status: 'success',
            data: users
        })
    }else{
        return res.status(400).json({
            status: 'failed',
            message:'somethinf wents wrong'
        })
    }
}