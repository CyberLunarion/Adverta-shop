import express from "express";

import { registerAccount, loginAccount, logoutAccount, refreshAccessToken } from "../controllers/account.controller.js";
import { resetPassword, sendPasswordResetEmail } from "../controllers/email.controller.js";
import { protectedRoutes } from "../controllers/protected_routes.controller.js";

const router = express.Router();

router.post("/register", registerAccount);
router.post("/login", loginAccount);
router.post("/logout", logoutAccount);
router.post("/refresh_token", refreshAccessToken);

router.post("/send-password-reset-email", sendPasswordResetEmail);
router.post("/reset-password/:id/:token", resetPassword);

router.get("/protected", protectedRoutes, async (req, res) => {
    try {
        // if account exists in the request, send the data
        if (req.account)
            return res.json({
                message: "You are logged in",
                success: true,
                account: req.account,
            });
        // if account doesn't exist, return error
        return res.status(500).json({
            message: "You are not logged in",
            success: false,
        });    
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: "Error getting protected route",
            error,
        });
    };
});

export default router;