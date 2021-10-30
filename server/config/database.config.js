const { connect } = require('mongoose')

const db = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.fj7mj.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`

exports.connectdb = async () => {
    try {
        await connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => console.log("database connected successfully".bgGreen.black.bold))
    } catch (error) {
        console.log(error.bgMagenta.red)
        process.exit(1)
    }
}

