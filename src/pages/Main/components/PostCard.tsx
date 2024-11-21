import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type PostImage = {
  imageUrl: string;
  originalName: string;
}

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
}

interface PostProps {
  post: Post
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <CardContainer onClick={() => { navigate(`/post/${post.postId}`) }}>
      <Dot />
      <img src={post.images[0]?.imageUrl} alt="일러스트" style={{ width: 150, height: 120, margin: 10 }} />
      <h4 style={{ margin: "0px 0px 0px 10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.title}</h4>
      <div style={{ display: "flex", margin: "5px 10px", width: "150px", justifyContent: "space-between" }}>
        <p style={{ margin: 0 }}>{post.price}</p>
        <p style={{ margin: 0 }}>조회수</p>
      </div>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  width: 170px;
  height: 210px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin: 10px;
  padding-bottom: 10px;
`;

const Dot = styled.div`
  background: #D9D9D9;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin: 4px auto;
`;

export default PostCard;