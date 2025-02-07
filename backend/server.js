import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";

import advertRoutes from "./routes/advert.route.js";
import accountRoutes from "./routes/account.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // newly added

app.use("/api/adverts", advertRoutes);

app.use("/api/accounts", accountRoutes); // newly added

/*app.use("/authtest", indexRouter);
app.use("/auth", authRouter);*/

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
