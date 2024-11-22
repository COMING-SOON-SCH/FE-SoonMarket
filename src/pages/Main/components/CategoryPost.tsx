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

  console.log(searchPostList);

  return (
    <>
      <CategoryBtnGroup selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      {
        searchPostList?.posts ? (
          searchPostList.posts.map((post) => (
            <div key={post.postId}>
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )
      }
    </>
  )
}

export default CategoryPost;