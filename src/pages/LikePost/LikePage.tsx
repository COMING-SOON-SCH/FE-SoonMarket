import styled from "styled-components";
import TopBar from "./components/TopBar";
import { useEffect } from "react";
import useGetLikePost from "./useGetLikePost";
import WidePostCard from "../../components/Post/WidePostCard";
import { Divider } from "@mui/material";


const LikePage = () => {
  const { likePosts, getLikePost } = useGetLikePost();

  useEffect(() => {
    getLikePost();
  }, [getLikePost]);

  return (
    <LikeContainer>
      <TopBar />
      <h1 style={{ margin: "0px 0px 0px 20px", alignSelf: "flex-start" }}>관심 목록</h1>
      {likePosts && likePosts.length > 0 ? (
        likePosts.map((data) => (
          <>
            <WidePostCard key={data.postId} post={data}/>
            <Divider style={{ width: "95%" }} />
          </>
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
