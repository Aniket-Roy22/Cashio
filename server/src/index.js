import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import prisma from "./config/prisma.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	}),
);
app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());

app.get("/health", async (req, res) => {
	try
	{
		await prisma.$queryRaw`SELECT 1`;
		res.status(200).json({status: "System & Database Online..."});
	}
	catch (error)
	{
		res.status(503).json({status: "System Error. Health Checkup Failed..."});
	}
});
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
});