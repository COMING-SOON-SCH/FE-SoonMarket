import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import styled from 'styled-components';
interface PostData {
    images: {imageUrl: string}[];
    title: string;
    date: string;
    price?: string;
    likes: number;
}

    

interface PostComponentProps {
    data: PostData;
    onClick: () => void;
}

const PostComponent: React.FC<PostComponentProps> = ({ data, onClick }) => {
  return (
    <DataContainer onClick={onClick}>
      <img src={data.images[0]?.imageUrl} alt="일러스트" style={{ width: 120, height: 120, margin: 10, borderRadius: "5%" }} />
      <Detail>
        <h3 style={{ margin: "20px 0px 5px 0px" }}>{data.title}</h3>
        <p style={{ margin: "5px 0px" }}>{data.date}</p>
        <p style={{ margin: "5px 0px" }}>{data.price}</p>
        <LikesContainer>
          <ThumbUpAltIcon style={{ fontSize: '20px' }} />
          <LikesText>{data.likes}</LikesText>
        </LikesContainer>
      </Detail>
    </DataContainer>
  )
}

const DataContainer = styled.div`
  width: 100%;
  display: flex;
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
`

const LikesText = styled.span`
  margin-left: 5px;
  font-size: 14px;
`

export default PostComponent;