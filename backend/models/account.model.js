import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "User",
        },
        verified: {
            type: Boolean,
            default: false,
        },
        refreshtoken: {
            type: String,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;