import axios from "axios";
import { useNavigate } from "react-router-dom";

// API 응답 타입 정의
interface SignUpRequest {
	email: string;
	password: string;
	nickname: string;
}

const useSignUp = () => {
	const apiUrl = import.meta.env.VITE_API_URL as string;
	const navigate = useNavigate();

	const fetchDefaultImage = async (): Promise<Blob> => {
		// 기본 이미지 URL에서 Blob 가져오기
		const emptyBlob = new Blob([], { type: "image/jpeg" });
    return emptyBlob;
	};
	const signUp = async (
		email: string, 
		password: string, 
		nickname: string
	): Promise<void> => {
		try {
			// API 요청
			
			const requestData : SignUpRequest = {
				email, // 필수값
				password, // 필수값
				nickname, // 필수값
			};

			// FormData 생성
			const formData = new FormData();
			formData.append("request", new Blob([JSON.stringify(requestData)], {type: "application/json"})); // JSON 데이터를 문자열로 추가

			// 빈 파일 추가 (Content-Type만 지정)
			formData.append("file", new Blob([], { type: "image/jpeg" }));

			// API 요청
			const response = await axios.post(`${apiUrl}/users/signup`, formData);

			navigate("/"); // 로그인 성공 후 메인 페이지로 이동
		} catch (error) {

			// 에러 메시지 사용자에게 표시 (선택 사항)
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message || "회원가입에 실패했습니다.";
				alert(message);
			}
		}
	};

	return signUp;
};

export default useSignUp;