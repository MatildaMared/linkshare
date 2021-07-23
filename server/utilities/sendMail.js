const nodemailer = require("nodemailer");

const sendMail = ({ userEmail, subject, html }) => {
  console.log(userEmail, subject, html);
	const transporter = nodemailer.createTransport({
		service: process.env.EMAIL_SERVICE,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const options = {
		from: process.env.EMAIL_FROM,
		to: userEmail,
		subject,
		html,
  };
  
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  })

};

module.exports = sendMail;
