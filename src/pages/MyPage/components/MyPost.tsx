import styled from "styled-components";
import PostCard from "../../../components/Post/PostCard";
import { useEffect } from "react";
import { Box } from "@mui/material";
import useGetMyPosts from "../../../api/Post/useGetMyPost";
import { Post } from "../../../type/postType";

const MyPost: React.FC = () => {
  const { myPosts, getMyPosts } = useGetMyPosts();
  console.log(myPosts);

  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  return (
    <MyPostContainer>
      {myPosts && myPosts.length > 0 ? (
        myPosts
          .reduce<Post[][]>((rows, _, index) => {
            if (index % 2 === 0) rows.push(myPosts.slice(index, index + 2));
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((post) => (
                <PostCard key={post.postId} post={post} />
              ))}
            </Row>
          ))
      ) : (
        <>
          {myPosts.length === 0 ? (
            <></>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </MyPostContainer>
  );
};

const MyPostContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: white;
  padding-bottom: 60px;
  align-items: flex-start;
`;

const Row = styled(Box)`
  display: flex;
  justify-content: space-around;
`;

export default MyPost;