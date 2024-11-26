import axios from "axios";
import { useCallback, useState } from "react"
import { useCookies } from "react-cookie";

type PostImage = {
  imageUrl: string;
  originalName: string;
};

type Post = {
  title: string;
  images: PostImage[];
  postId: number;
  price: number;
  category: string;
  countLike: number;
  openchatUrl: string;
  createAt: string;
  updateAt: string;
  deleteAt: string | null;
};
const useGetLikePost = () => {
  const [likePosts, setLikePosts] = useState<Post[] | null>(null);
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const getLikePost = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${apiUrl}/likes`, {
        headers: {
          Authorization: `${token}`
        }
      });
      setLikePosts(response.data);
      console.log('좋아요 게시글 받아오기 성공');
    } catch (error) {
      console.error('좋아요 게시물 받아오는 중 오류 발생', error);
    }
  }, [token])

  return { likePosts, getLikePost };
}

export default useGetLikePost;