import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
	return axios.post(API_URL + "signup", {
		username,
		email,
		password,
	});
};

const login = async (username, password) => {
	const res = await axios.post(API_URL + "signin", {
		username,
		password,
	});
	if (res.data.accessToken) {
		localStorage.setItem("user", JSON.stringify(res.data));
		localStorage.setItem("isLogIn", true);
	}
	return res.data;
};

const logout = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("isLogIn");
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const AuthService = { register, login, logout, getCurrentUser };

export default AuthService;
