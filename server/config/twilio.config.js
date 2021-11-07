const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE_NUMBER
const messageServiceId = process.env.TWILIO_MESSAGE_SID
const client = require('twilio')(`${accountSid}`, `${authToken}`);

exports.sendSms = (to, body, txt) => {
    try {
        client.messages
            .create({
                messagingServiceSid: `${messageServiceId}`,
                body: `${body} - ${txt}`,
                from: `${from}`,
                to: `${to}`,
            })
            .then(message => console.log(message)).done()
    } catch (error) {
        console.log(error)
    }
}


