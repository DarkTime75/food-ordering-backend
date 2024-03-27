import "dotenv/config";
import nodemailer from "nodemailer";
import { getHtmlBody } from "./templates/mail.template.js";


const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: process.env.NODE_ENV === "production",
  auth: {
    user: "suryaharsh279@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOTPEmail(email, otp) {
    if (!email || !otp) {
      throw new Error("sendOTPEmail(): Email and OTP are required to send OTP Email");
    }

    console.log(`Sending mail to email: ${email}, OTP: ${otp}`);
    let success = false;

    try {
        const messageInfo = await transporter.sendMail({
            from: {
                name: "Just Eat",
                address: "suryaharsh279@gmail.com",
            },
            to: email,
            subject: "OTP Verification",
            text: "Welcome to Just Eat",
            html: getHtmlBody(otp),
        });

      success = true;
      console.log(`OTP Sent successfully to email: ${email}, OTP: ${otp}`);
      console.log(`Message Info: ${JSON.stringify(messageInfo)}`);
    } catch (error) {
        console.log(`An error occured while sending mail to email: ${email}, OTP: ${otp}`);
    }

    return success;
}