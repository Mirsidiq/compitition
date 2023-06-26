import nodemailer from "nodemailer";
import { PORT } from "../config/config.js";
async function gmail(email, number, token) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mirsidiq2002@gmail.com",
      pass: process.env.MAILER,
    },
  });

  let info = await transporter.sendMail({
    from: "mirsidiq2002@gmail.com",
    to: `${email}`,
    subject: "Verification 😎",
    html: `please click this link <a href="http://localhost:${PORT}/pass/code/${token}">${number}</a>`,
  });
}
export { gmail };
