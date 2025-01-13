import React from "react";
import styled from "styled-components";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import clipImg from "../../../assets/clip.png";

interface RecommendCardProps {
  img: string; // 이미지 경로
  title: string; // 제목
  price: number; // 가격
  style?: React.CSSProperties; // 스타일(선택적)
  onThumbUp: () => void;
  onThumbDown: () => void;
}


const RecommendCard: React.FC<RecommendCardProps> = ({ img, title, price, style, onThumbDown, onThumbUp }) => {
  return (
    <RecommendCardWrapper>
      <RecommendCardBox style={style}>
        <Dot/>
        <ImgBox>
          <Img src={img} alt="게시글 사진"/>
        </ImgBox>
        <Separator />
        <CardContent>
          <Title>{title}</Title>
          <Price>₩{price.toLocaleString()}</Price>
          <LikeDislikeBtnBox>
            <LikeDislikeBtn>
              <ThumbDownOffAltIcon onClick={onThumbDown} />
            </LikeDislikeBtn>
            <LikeDislikeBtn>
              <ThumbUpOffAltIcon onClick={onThumbUp} />
            </LikeDislikeBtn>
          </LikeDislikeBtnBox>
        </CardContent>
      </RecommendCardBox>
    </RecommendCardWrapper>
  );
};

const RecommendCardWrapper = styled.div`
`;

// Styled Components
const RecommendCardBox = styled.div`
  border-radius: 2px;
  width: 260px;
  height: 470px;
  position: relative;
  display: flex;
  margin: 10px 5px;
  padding: 0px 20px;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 380px) {
    width: 200px;
    height: 350px;
  }
`;

const ImgBox = styled.div`
  width: 260px;
  height: 260px;
  overflow: hidden;
  position: relative;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 그림자를 이미지 위로 표시 */
  &::after {
    content: "";
    position: absolute;
    inset: 0; /* 부모 크기에 맞춤 */
    box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.15); /* 안쪽 그림자 */
    pointer-events: none; /* 상호작용 차단 */
  }

  @media (max-width: 380px) {
    width: 130px;
    height: 130px;
  }
`;

const Dot = styled.div`
  background: #d9d9d9;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 8px auto;
  box-shadow: 1px 1px 1px 0px;
`;

const Img = styled.img`
  width: 100%; /* ImgBox의 크기에 맞춤 */
  height: 100%;
  object-fit: cover; /* 이미지 비율을 유지하며 빈 부분 없이 채움 */
  background-color: #ffffff; /* 이미지가 없는 경우 대비 */
  position: relative; /* ImgBox 위에 위치 */

  @media (max-width: 380px) {
    width: 100%; /* ImgBox에 맞게 조정 */
    height: 100%;
  }
`;

const Separator = styled.div`
  width: 90%;
  height: 2px;
  background-color: #ddd;
  margin: 10px 0;
  border-radius: 1px;
`;

const CardContent = styled.div`
  width: 80%;
  padding: 20px 0px;
  background: #ffffff;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
  text-align: center;
`;

const Price = styled.p`
  margin: 5px 0 20px 0;
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

const LikeDislikeBtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const LikeDislikeBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #e9ecef;
    transform: scale(1.1);
  }
`;

export default RecommendCard;