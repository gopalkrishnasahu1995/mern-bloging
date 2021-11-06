const sendGrid = require('../config/sendgrid.config');
const template = require('../utils/mailtemplates');
const nodemailer = require('../config/nodemailer.config')

exports.sendEmail = async (email, type, host, data, token) => {
  let result;
  let response;
  try {
    const message = prepareTemplate(type, host, data, token);
    // response = await sendGrid.sendEmail(email, message);
    response = await nodemailer.sendEmail(email, message);

  } catch (error) {
    console.log(error)
  }
  if (response) {
    result = response;
  }
  return result;
};

const prepareTemplate = (type, host, data, token) => {
  let message;

  switch (type) {
    case 'reset':
      message = template.resetEmail(host, data);
      break;

    case 'loginSuccess':
      message = template.loginSuccess(data);
      break;

    case 'forgotPassword':
      message = template.forgotPassword(token);
      break;

    case 'reset-confirmation':
      message = template.confirmResetPasswordEmail();
      break;

    case 'register':
      message = template.signupEmail(token);
      break;

    case 'newsletter-subscription':
      message = template.newsletterSubscriptionEmail();
      break;

    case 'contact':
      message = template.contactEmail();
      break;

    case 'merchant-application':
      message = template.merchantApplicationEmail();
      break;

    case 'order-confirmation':
      message = template.orderConfirmationEmail(data);
      break;

    default:
      message = '';
  }

  return message;
};
