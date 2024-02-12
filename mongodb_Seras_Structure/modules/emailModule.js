import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "dabidipesh7898@gmail.com",
        pass: "dhck hnag hpvu jpzc"
    },
    secure: true
});