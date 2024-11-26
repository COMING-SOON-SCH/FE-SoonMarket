import styled from "styled-components";
import TopBar from "./components/TopBar";
import { useEffect } from "react";
import PostComponent from "./components/PostComponent";
import { useNavigate } from "react-router-dom";
import useGetLikePost from "./useGetLikePost";

interface LikePost {
    id: number;
    postId: number;
    title: string;
    images: {imageUrl: string}[];
    date: string;
    likes: number;
    price?: string;
}

const LikePage = () => {
  const navigate = useNavigate();
  const { likePosts, getLikePost } = useGetLikePost();

  useEffect(() => {
    getLikePost();
  }, [getLikePost]);

  return (
    <LikeContainer>
      <TopBar />
      <h1 style={{ margin: "0px 0px 0px 20px", alignSelf: "flex-start" }}>관심 목록</h1>
      {likePosts && likePosts.length > 0 ? (
        likePosts.map((data: LikePost) => (
          <PostComponent key={data.id} data={data} onClick={() => navigate(`/post/${data.postId}`)} />
        ))
      ) : (
        <p>관심 목록이 없습니다.</p>
      )}
    </LikeContainer>
  );
};

const LikeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
`

export default LikePage;
