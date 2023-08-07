const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // secure: process.env.EMAIL_SECURE,
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
})

module.exports = (options) => {
	transporter
		.sendMail({ from: process.env.EMAIL_USERNAME, ...options })
		.catch((err) => console.log(err))
}
