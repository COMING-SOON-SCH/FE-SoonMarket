import axios from "axios";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuthenticated } from "../../redux/modules/auth";

const useLogin = () => {
	const apiUrl = import.meta.env.VITE_API_URL as string;
	const cookies = new Cookies();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const login = async (email: string, password: string, fcmToken: string | null): Promise<void> => {
		if (!fcmToken) throw new Error("fcmtokenerror");

		await axios.post(`${apiUrl}/users/login`, {
			email,
			password,
			fcmToken,
		}).then((response) => {
			const accessToken = response.data.accessToken;
			const refreshToken = response.data.refreshToken;

			cookies.set("access_token", accessToken, {
				path: "/",
				httpOnly: false, // 클라이언트에서 접근 가능
				secure: false, // HTTPS 환경에서 true로 설정 권장
				sameSite: "strict",
				expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 🔹 7일 동안 유지
			});

			cookies.set("refresh_token", refreshToken, {
				path: "/",
				httpOnly: false,
				secure: false,
				sameSite: "strict",
				expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 🔹 30일 동안 유지
			});

			dispatch(setIsAuthenticated(true));
			navigate("/main");
		}).catch((error) => {
			dispatch(setIsAuthenticated(false));
			console.error("로그인 실패:", error.message);
			throw new Error("401Error");
		});
	};
	return login;
};

export default useLogin;