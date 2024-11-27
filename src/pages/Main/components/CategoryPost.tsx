import { useEffect, useState } from "react";
import useGetSearchPostList from "../../../api/Post/useGetSearchPostList";
import PostCard from "./PostCard";
import CategoryBtnGroup from "../../../components/Post/CategoryBtnGroup";
import styled from "styled-components";

const CategoryPost: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const { searchPostList, getSearchPostList } = useGetSearchPostList();

  useEffect(() => {
    selectedCategory === "전체" ? getSearchPostList("", "", 10, 0) : getSearchPostList("", selectedCategory, 10, 0);
  }, [getSearchPostList, selectedCategory]);

  return (
    <>
      <CategoryBtnGroup selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <PostContainer>
        {
          searchPostList?.posts.length ? (
            searchPostList.posts.map((post) => (
              <div key={post.postId}>
                <PostCard post={post} />
              </div>
            ))
          ) : (
            <p>게시물이 없습니다.</p>
          )
        }
      </PostContainer>
    </>
  )
}

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`

export default CategoryPost;