import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem("accessToken");

		if (accessToken)
		{
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 403 &&
			!originalRequest._retry &&
			originalRequest.url !== "/auth/token"
		) {
			originalRequest._retry = true;

			try {
				const res = await axios.post(
					`${API_URL}/auth/token`,
					{},
					{
						withCredentials: true,
					},
				);

				const newAccessToken = res.data.accessToken;
				localStorage.setItem("accessToken", newAccessToken);
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return api(originalRequest);
			} catch (refreshError) {
				localStorage.removeItem("accessToken");
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

export default api;