import pkg from "jsonwebtoken";
const { sign } = pkg;

// signing the access token
export const createAccessToken = (id) => {
    return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 15 * 60,
    });
};

// signing the refresh token
export const createRefreshToken = (id) => {
    return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "90d",
    });
};

// sending the access token to the client
export const sendAccessToken = (_req, res, accesstoken) => {
    res.json({
        accesstoken,
        message: "Sign in Successful",
        success: true,
    });
};

// sending the refresh token to the client as a cookie
export const sendRefreshToken = (res, refreshtoken) => {
    res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
    });
};

// password reset token
export const createPasswordResetToken = ({ _id, email, password }) => {
    const secret = password;
    console.log("checkpoint1");
    return sign({ id: _id, email }, secret, {
        expiresIn: 15 * 60, // 15 minutes
    });
};