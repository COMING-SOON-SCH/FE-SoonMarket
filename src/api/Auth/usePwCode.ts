// (비밀번호 재설정)이메일을 보내는 api를 다루는 컴포넌트
import axios from "axios";

interface LoginResponse {
  message: string;
}

const usePwCode = () => {
  const apiUrl = import.meta.env.VITE_API_URL as string;

  const sendEmail = async (email: string): Promise<void> => {
    try {
      await axios.post<LoginResponse>(`${apiUrl}/auth/password-reset`, {
        email,
      });
    } catch (error) {
      const message = axios.isAxiosError(error) ? error.response?.data?.message : "이메일 발송 실패";
      alert(message);
    }
  };

  return { sendEmail };
};

export default usePwCode;
