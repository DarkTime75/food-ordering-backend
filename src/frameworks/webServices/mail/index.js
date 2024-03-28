import "dotenv/config";
import nodemailer from "nodemailer";
import { getOtpHtmlBody } from "./templates/otp.template.js";
import { getPasswordResetLinkHtmlBody } from "./templates/password-reset.template.js";


const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.NODE_ENV === "production",
  auth: {
    user: process.env.EMAIL_USER,
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
                address: process.env.EMAIL_USER,
            },
            to: email,
            subject: "OTP Verification",
            text: "Welcome to Just Eat",
            html: getOtpHtmlBody(otp),
        });

      success = true;
      console.log(`OTP Sent successfully to email: ${email}, OTP: ${otp}`);
      console.log(`Message Info: ${JSON.stringify(messageInfo)}`);
    } catch (error) {
      console.error(error);
      console.log(`An error occured while sending mail to email: ${email}, OTP: ${otp}`);
    }

    return success;
}

export async function sendPasswordResetLink(email, passwordResetLink) {
    if (!email || !passwordResetLink) {
      throw new Error("sendPasswordResetLink(): Email and Password Reset Link are required to send Password Reset Link");
    }

    console.log(`Sending mail to email: ${email}, Password Reset Link: ${passwordResetLink}`);
    let success = false;

    try {
      const messageInfo = await transporter.sendMail({
        from: {
            name: "Just Eat",
            address: process.env.EMAIL_USER,
        },
        to: email,
        subject: "Password Reset Request",
        html: getPasswordResetLinkHtmlBody(passwordResetLink),
      });

      success = true;
      console.log(`OTP Sent successfully to email: ${email}, Password Reset Link: ${passwordResetLink}`);
      console.log(`Message Info: ${JSON.stringify(messageInfo)}`);
    } catch (error) {
      console.error(error);
      console.log(`An error occured while sending mail to email: ${email}, Password Reset Link: ${passwordResetLink}`);
    }

    return success;
  }