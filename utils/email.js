const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLEINT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
   CLIENT_ID,
   CLEINT_SECRET,
   REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(user , token) {
   try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            type: 'OAuth2',
            user: process.env.HOST_EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLEINT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
         },
      });

      const mailOptions = {
         from: `${process.env.HOST_EMAIL}`,
         to: user.email,
         subject: 'Email Verification',
         text: 'Please verify your email address by copy this link and paste in your app field.',
         html: `<h4>Please verify your email address by copy this link and paste in your app field.</h4>
         <h5>NOTE: Verification token will be expired under 10 minutes.</h5><br /><h5>${token}</h5>`,
      };

      const result = await transport.sendMail(mailOptions);
      return result;
   } catch (error) {
      return error;
   }
}


module.exports = sendMail;