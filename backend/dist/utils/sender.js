import nodemailer from "nodemailer";
// import rateLimit from "express-rate-limit";
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    // service: process.env.SERVICE, // Uncomment if you use a service like Gmail
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    // tls: {
    //   rejectUnauthorized: false, // Uncomment if needed for your SMTP server
    // },
});
// Function to send an email
const sendEmail = (body, res, message) => {
    return new Promise((resolve, reject) => {
        transporter.verify((err, success) => {
            if (err) {
                console.error("Verification error:", err);
                if (res) {
                    res.status(403).send({
                        message: `Error during verification: ${err.message}`,
                    });
                }
                return reject(err);
            }
            else {
                console.log("Server is ready to take our messages");
                transporter.sendMail(body, (err, data) => {
                    if (err) {
                        console.error("Error sending email:", err);
                        if (res) {
                            res.status(403).send({
                                message: `Error sending email: ${err.message}`,
                            });
                        }
                        return reject(err);
                    }
                    else {
                        if (res) {
                            res.send({
                                message: message,
                            });
                        }
                        return resolve(data);
                    }
                });
            }
        });
    });
};
export default sendEmail;
//limit email verification and forget password
// const minutes = 30;
// const emailVerificationLimit = rateLimit({
//   windowMs: minutes * 60 * 1000,
//   max: 3,
//   handler: (req, res) => {
//     res.status(429).send({
//       success: false,
//       message: `You made too many requests. Please try again after ${minutes} minutes.`,
//     });
//   },
// });
// const passwordVerificationLimit = rateLimit({
//   windowMs: minutes * 60 * 1000,
//   max: 3,
//   handler: (req, res) => {
//     res.status(429).send({
//       success: false,
//       message: `You made too many requests. Please try again after ${minutes} minutes.`,
//     });
//   },
// });
// const supportMessageLimit = rateLimit({
//   windowMs: minutes * 60 * 1000,
//   max: 5,
//   handler: (req, res) => {
//     res.status(429).send({
//       success: false,
//       message: `You made too many requests. Please try again after ${minutes} minutes.`,
//     });
//   },
// });
// module.exports = {
//   sendEmail,
//   // emailVerificationLimit,
//   // passwordVerificationLimit,
//   // supportMessageLimit,
// };
