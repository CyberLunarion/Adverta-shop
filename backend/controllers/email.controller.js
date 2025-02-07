import { createTransport } from "nodemailer";
import Account from "../models/account.model.js";
import { createPasswordResetToken } from "./tokens.controller.js";
import { hash } from "bcrypt";
import pkg from "jsonwebtoken";
const { verify } = pkg;

export const createPasswordResetUrl = (id, token) => {
    console.log("checkpoint2");
    return `http://localhost:5173/reset-password/${id}/${token}`;
};

export const transporter = createTransport({
    service: "gmail.com",
    auth: {
        user: 'authsystemshop@gmail.com',
        pass: 'onsq qyke xkdn wqke',
    },
});

export const passwordResetTemplate = (account, url) => {
    const { email } = account;
    console.log("checkpoint3");
    return {
        from: `Mail - <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Reset Password`,
        html: `
           <h2>Password Reset Link</h2>
            <p>Reset your password by clicking on the link below:</p>
            <a href=${url}><button>Reset Password</button></a>
            <br />
            <br />
            <small><a style="color: #38A169" href=${url}>${url}</a></small>
            <br />
            <small>The link will expire in 15 mins!</small>
            <small>If you haven't requested password reset, please ignore!</small>
            <br /><br />
            <p>Thanks,</p>
            <p>Product Store</p>`,
    };
};

export const passwordResetConfirmationTemplate = (account) => {
    const { email } = account;
    return {
        from: `Mail - <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Password Reset Successful`,
        html: `
            <h2>Password Reset Successful</h2>
            <p>You've successfully updated your password for your account <${email}>. </p>
            <small>If you did not change your password, reset it from your account.</small>
            <br /><br />
            <p>Thanks,</p>
            <p>Authentication API</p>`,
    };
};

export const sendPasswordResetEmail = async (req, res) => {
    try {
        transporter.verify(function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
        });
        // get the email from the body
        const { email } = req.body;
        // find the account by the email
        const account = await Account.findOne({ email });
        // if the account doesn't exist, return error
        if (!account)
            return res.status(500).json({ message: "Account doesn't exist", type: "error", });
        // create password token
        const token = createPasswordResetToken({ ...account, createdAt: Date.now() });
        // create the password reset url
        const url = createPasswordResetUrl(account._id, token);
        // send the email
        const mailOptions = passwordResetTemplate(account, url);
        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                return res.status(500).json({ message: "Error sending mail!", type: "error", });
            return res.json({ message: "Password reset link has been sent to your email", type: "success", });
        });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Error sending email", error, });
    };
};

export const resetPassword = async (req, res) => {
    try {
        // get the account details from the url
        const { id, token } = req.params;
        // get the new password from request body
        const { newPassword } = req.body;
        // find the account by id
        const account = await Account.findById(id);
        // if the account doesn't exist, return error
        if (!account)
            return res.status(500).json({ message: "Account doesn't exist", type: "error", });
        // verify if the token is valid
        const isValid = verify(token, account.password);
        // if the password reset token is invalid, return error
        if (!isValid)
            return res.status(500).json({ message: "Invalid token", type: "error", });
        // set the account's password to the new password
        account.password = await hash(newPassword, 10);
        // save the account
        await account.save();
        // send the email
        const mailOptions = passwordResetConfirmationTemplate(account);
        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                return res.status(500).json({ message: "Error sending email", type: "error", });
            return res.json({ message: "Email sent", type: "success", });
        });
    } catch (error) {
        return res.status(500).json({ type: "error", message: "Error sending email", error, });
    };
};