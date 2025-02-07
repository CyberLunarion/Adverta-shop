import pkg from "jsonwebtoken";
const { verify } = pkg;
import Account from "../models/account.model.js";

export const protectedRoutes = async (req, res, next) => {
    // get the token from the header
    const authorization = req.headers["authorization"];

    // if we don't have a token, return error
    if (!authorization)
        return res.status(500).json({ message: "No token found", success: false, });

    // if we have a token, verify it
    const token = authorization.split(" ")[1];
    let id;
    try {
        id = verify(token, process.env.ACCESS_TOKEN_SECRET).id;
    } catch {
        return res.status(500).json({ message: "Invalid token", success: false, });
    };

    // if the token is invalid, return error
    if (!id)
        return res.status(500).json({ message: "Invalid token", success: false, });

    // if token is valid, check if the account exists
    const account = await Account.findById(id);

    // if the account doesn't exist, return error
    if (!account)
        return res.status(500).json({ message: "Account doesn't exist", success: false, });

    // if the account exists, add new field called "account" to the request
    req.account = account;
    // call the next middleware
    next();
};
