import api from "../config/api";

export async function loginUser(data)
{
	return api.post("/auth/login", data);
}

export async function registerUser(data)
{
	return api.post("/auth/register", data);
}

export async function getCurrentUser()
{
	return api.post("/auth/token");
}

export async function logoutUser()
{
	return api.post("/auth/logout");
}