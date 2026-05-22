import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

export async function registerUser(req, res, next)
{
	try {
		const {username, email, password} = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({
				message: "MISSING_CREDENTIALS",
			});
		}

		const existingUser = await prisma.users.findFirst({
			where: {
				OR: [{username: username}, {email: email}],
			},
			select: {
				id: true,
				username: true,
				email: true,
			},
		});

		if (existingUser) {
			if (existingUser.username === username) {
				return res.status(409).json({
					message: "USERNAME_ALREADY_EXISTS",
				});
			}

			if (existingUser.email === email) {
				return res.status(409).json({
					message: "EMAIL_ALREADY_EXISTS",
				});
			}
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.users.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
			select: {
				id: true,
				username: true,
			},
		});

		req.user = newUser;
		next();
	} catch (error) {
		console.error("registerUser error:", error);

		return res.status(500).json({
			message: "INTERNAL_SERVER_ERROR",
		});
	}
}