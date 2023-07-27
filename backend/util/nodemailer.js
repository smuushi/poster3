const nodemailer = require("nodemailer");

async function sendPoster(data, movieData) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: '',
            pass: ''
        }
    })

    const info = await transporter.sendMail({
        from: "movieposter85@gmail.com",
        to: data.email,
        subject: "Notification",
        text: `Please click here for poster: ${movieData}`
    })

    console.log("Message sent: %s", info.messageId)
}

export default sendPoster;