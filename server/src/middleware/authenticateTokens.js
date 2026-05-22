import jwt from "jsonwebtoken";

export function authenticateAccessToken(req, res, next)
{
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		return res.status(401).send("ACCESS_TOKEN_NOT_FOUND");
	}

	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		(err, decodedPayload) => {
			if (err) {
				return res.status(403).send("ACCESS_TOKEN_UNVERIFIABLE");
			}

			req.user = decodedPayload;
			next();
		},
	);
}

export function authenticateRefreshToken(req, res, next)
{
	const token = req.cookies?.refreshToken;

	if (!token) {
		return res.status(401).send("REFRESH_TOKEN_NOT_FOUND");
	}

	jwt.verify(
		token,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decodedPayload) => {
			if (err) {
				return res.status(403).send("REFRESH_TOKEN_UNVERIFIABLE");
			}

			req.user = decodedPayload;
			next();
		},
	);
}