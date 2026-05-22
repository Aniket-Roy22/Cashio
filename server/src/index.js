import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";

const PORT = 3000;
const app = express();

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
});