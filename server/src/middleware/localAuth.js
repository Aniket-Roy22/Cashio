import passport from "../config/passportConfig.js";

export function localAuth(req, res, next)
{
	passport.authenticate("local", {session: false}, (err, user, info) => {
		if (err) return next(err);

		if (!user)
			return res.status(401).json({
				message: info?.message || "USER_NOT_FOUND",
			});

		req.user = user;
		next();
	})(req, res, next);
}