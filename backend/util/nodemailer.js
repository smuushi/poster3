const nodemailer = require("nodemailer");

async function sendPoster(email, url) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    })

    const info = await transporter.sendMail({
        from: "movieposter85@gmail.com",
        to: email,
        subject: "Notification",
        text: `Please click here for poster: ${url}`
    })

    console.log("Message sent: %s", info.messageId)
};

module.exports = sendPoster;