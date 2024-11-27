import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useAddPost = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const addPost = async (formData: FormData) => {
    try {
      console.log('게시물 등록 시도', formData);
      await axios.post(`${apiUrl}/posts`, formData, {
        headers: {
          Authorization: `${token}`
        }
      });
      console.log('게시물 추가 완료');
      navigate('/main');
    } catch (error) {
      console.error('게시물 추가 중 오류 발생', error);
    }
  }

  return addPost;
}

export default useAddPost