import passport from "passport";
import bcrypt from "bcrypt";
import prisma from "./prisma.js";
import {Strategy as LocalStrategy} from "passport-local";

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
		},
		async (username, password, done) => {
			try {
				const user = await prisma.users.findFirst({
					where: {
						username: username,
					},
					select: {
						id: true,
						username: true,
						password: true,
					},
				});

				if (!user) {
					return done(null, false, {
						message: "USER_NOT_FOUND",
					});
				}

				const isMatch = await bcrypt.compare(password, user.password);

				if (!isMatch) {
					return done(null, false, {
						message: "INVALID_PASSWORD",
					});
				}

				return done(null, {
					id: user.id,
					username: user.username,
				});
			} catch (error) {
				return done(error);
			}
		},
	),
);

export default passport;