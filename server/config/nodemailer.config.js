const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library')
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`
const SENDER_MAIL_ADDRESS = `${process.env.SENDER_EMAIL_ADDRESS}`
const SENDER_PASSWORD = `${process.env.SENDER_EMAIL_PASSWORD}`


exports.sendEmail = async (recipient, message) => {
    const oAuthClient = new OAuth2Client(
        CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND
    )

    oAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN })
    const access_token = await oAuthClient.getAccessToken()
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: false,
        auth: {
            type: 'OAuth2',
            user: SENDER_MAIL_ADDRESS,
            pass: SENDER_PASSWORD,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: access_token
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const data = {
        from: `S.K Bakery <${SENDER_MAIL_ADDRESS}>`,
        to: recipient,
        subject: `${message.subject}`,
        text: `${message.text}`,
        html: `${message.html}`
    };

    await transporter.sendMail(data)
        .then(result => console.log(result))
        .catch(err => console.log(err))
};
