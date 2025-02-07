import Account from "../models/account.model.js";
import { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } from "./tokens.controller.js";
import { hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { verify } = pkg;

export const registerAccount = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //check if account exists
        const account = await Account.findOne({ email: email });

        // if account exists, return error
        if (account)
            return res.status(500).json({ message: "Account already exists", success: false, });
        
        // if account doesn't exist, create a new account
        // hashing the password
        const passwordHash = await hash(password, 10);
        const newAccount = new Account({
            username: username,
            email: email,
            password: passwordHash,
        });

        // save account to database
        await newAccount.save();

        // send the response
        res.status(200).json({ message: "Account created successfully", success: true, });

    } catch (error) {
        console.log("error in creating account:", error.message);
		res.status(500).json({ success: false, message: "Server Error", error });
    }
};

export const loginAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if account exists
        const account = await Account.findOne({ email: email });

        if (!account)
            return res.status(500).json({ message: "Account doesn't exist", success: false, });

        // if account exists, check if password is correct
        const isMatch = await compare(password, account.password);

        // if password is incorrect, return error
        if (!isMatch)
            return res.status(500).json({ message: "Password is incorrect", success: false, });

        // if password is correct, sign the tokens
        const accessToken = createAccessToken(account._id);
        const refreshToken = createRefreshToken(account._id);

        // put refresh token in database
        account.refreshtoken = refreshToken;
        await account.save();

        // send the response
        sendRefreshToken(res, refreshToken);
        sendAccessToken(req, res, accessToken);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error logging in", error})
    };    
};

export const logoutAccount = (_req, res) => {
    // clear cookies
    res.clearCookie("refreshtoken");
    return res.json({ message: "Logged out successfully", success: true, });
};

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshtoken } = req.cookies;

        // if no refresh token, return error
        if (!refreshtoken)
            return res.status(500).json({ message: "No refresh token", type: "error", });

        // if we have a refresh token, verify it
        let id;
        try {
            id = verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET).id;
        } catch (error) {
            return res.status(500).json({ message: "Invalid refresh token", type: "error", });
        };

        // if the refresh token is invalid, return error
        if (!id)
            return res.status(500).json({ message: "Invalid refresh token", type: "error", });

        // if the refresh token is valid, check if the account exists
        const account = await Account.findById(id);

        // if the account doesn't exist, return error
        if (!account)
            return res.status(500).json({ message: "Account doesn't exist", type: "error", });

        // if the account exists, check if the refresh token is correct. if not return error
        if (account.refreshtoken !== refreshtoken)
            return res.status(500).json({ message: "Invalid refresh token", type: "error", });

        // if the refresh token is correct, create new tokens
        const accessToken = createAccessToken(account._id);
        const refreshToken = createRefreshToken(account._id);

        // update the refresh token in database
        account.refreshtoken = refreshToken;

        // send the new tokens as response
        return res.json({ message: "Refreshed successfully", type: "success", accessToken, });
    } catch (error) {
        res.status(500).json({ type: "error", message: "Error refreshing token" });
    };
};