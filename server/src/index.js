import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());

app.get("/health", (req, res) => {
	console.log("Server Online...");
	res.status(200).json({
		status: "online",
	});
})
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
});