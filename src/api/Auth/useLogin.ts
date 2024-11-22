import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// API 응답 타입 정의
interface LoginResponse {
    accessToken: string;
}

const useLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL as string; // 환경 변수가 존재한다고 가정
    const cookies = new Cookies();
    const navigate = useNavigate();
    const login = async (email: string, password: string): Promise<void> => {
        console.log(email, password);
        try {
            // API 요청
            const response = await axios.post<LoginResponse>(`${apiUrl}/users/login`, {
                email,
                password,
            });
            console.log(response);

            // 토큰 저장
            const token = response.data.accessToken;
            console.log(response);
            cookies.set("access_token", token, {
                path: "/",
                httpOnly: false, // 브라우저 자바스크립트에서 접근 가능
                secure: true, // HTTPS 환경에서만 작동
                sameSite: "strict", // 동일 사이트에서만 쿠키 전송
                maxAge: 1800, // 30분 (초 단위)
            });

            console.log("로그인 성공");
            navigate("/main"); // 로그인 성공 후 메인 페이지로 이동
        } catch (error) {
            console.error("로그인 도중 오류 발생", error);

            // 에러 메시지 사용자에게 표시 (선택 사항)
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "로그인에 실패했습니다.";
                alert(message);
            }
        }
    };

    return login;
};

export default useLogin;