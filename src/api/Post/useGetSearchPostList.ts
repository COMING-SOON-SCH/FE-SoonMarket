import axios from "axios";
import { useCallback, useState } from "react";

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
  deleteAt: string;
};

type PostListResponse = {
  posts: Post[];
  last: boolean; // 페이지네이션의 마지막 여부
};

const useGetSearchPostList = () => {
  const [searchPostList, setSearchPostList] = useState<PostListResponse | null>(null);

  const getSearchPostList = useCallback(async (keyword: string, category: string, size: number, page: number) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.get(`${apiUrl}/posts/search`, {
      params: {
        keyword,
        category,
        size,
        page
      }
    }).then(response => setSearchPostList(response.data))
      .catch(error => console.error(error));
  }, [])

  return { searchPostList, getSearchPostList };
}

export default useGetSearchPostList;