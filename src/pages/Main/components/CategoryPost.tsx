import { useEffect, useState } from "react";
import useGetSearchPostList from "../../../api/Post/useGetSearchPostList";
import CategoryBtnGroup from "./CategoryBtnGroup";
import PostCard from "./PostCard";

const CategoryPost: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const { searchPostList, getSearchPostList } = useGetSearchPostList();

  useEffect(() => {
    selectedCategory === "전체" ? getSearchPostList("", "", 10, 0) : getSearchPostList("", selectedCategory, 10, 0);
  }, [getSearchPostList, selectedCategory]);

  return (
    <>
      <CategoryBtnGroup selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      {
        searchPostList?.posts.map(post => {
          <PostCard key={post.postId} post={post} />
        })
      }
    </>
  )
}

export default CategoryPost;