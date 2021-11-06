const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const SENDER_MAIL_ADDRESS = `${process.env.SENDER_EMAIL_ADDRESS}`

exports.sendEmail = async (recipient, message) => {
    const data = {
        from: `SKBakery <${SENDER_MAIL_ADDRESS}>`,
        to: recipient,
        subject: `${message.subject}`,
        text: `${message.text}`,
        html: `${message.html}`
    };
    sgMail
        .send(data)
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.error(error)
        })
};
