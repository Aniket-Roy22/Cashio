export function logoutUser(req, res)
{
	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		path: "/auth",
	});

	return res.status(200).json({
		success: true,
		message: "LOGOUT_SUCCESSFUL",
	});
}
