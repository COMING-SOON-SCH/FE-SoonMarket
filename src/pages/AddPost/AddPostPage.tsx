import { Button, IconButton } from "@mui/material";
import styled from "styled-components";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import useAddPost from "../../api/Post/useAddPost";
import { useState } from "react";
import UploadImgBox from "./components/UploadImgBox";
import ProductDescriptionInputBox from "./components/ProductDescriptionInputBox";

// UploadImgBox에서 사용하는 타입 가져오기
interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

const AddPostPage: React.FC = () => {
  const navigate = useNavigate();
  const addPost = useAddPost();

  const [uploadImg, setUploadImg] = useState<UploadedImage[]>([]);
  const [description, setDescription] = useState({
    title: "",
    content: "",
    price: 0,
    category: "",
    openchatUrl: "",
    sold: false,
  });

  // 모든 필드가 채워져 있는지 확인하는 함수
  const isFormComplete = () => {
    return (
      uploadImg.length > 0 && // 업로드된 이미지가 1개 이상인지 확인
      description.title.trim() !== "" &&
      description.content.trim() !== "" &&
      description.price > 0 && // 가격이 양수여야 한다고 가정
      description.category.trim() !== "" &&
      description.openchatUrl.trim() !== ""
    );
  };

  const handleAddPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formData = new FormData();

    // 바로 uploadImg에서 파일 객체를 추출하여 formData에 추가
    uploadImg.forEach((imageFile) => {
      formData.append("file", imageFile.file); // 파일 객체 추가
    });

    formData.append(
      "request",
      new Blob([JSON.stringify(description)], { type: "application/json" })
    );

    // FormData 출력 확인용 (디버깅)
    for (const entry of formData.entries()) {
      console.log(entry);
    }

    // 게시글 추가 함수 호출
    addPost(formData);
  };

  return (
    <AddPostContainer>
      <AddPostTitleBox>
        <BackBtn onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </BackBtn>
        <h3>물건 등록</h3>
      </AddPostTitleBox>
      <UploadImgBox uploadImg={uploadImg} setUploadImg={setUploadImg} />
      <ProductDescriptionInputBox
        description={description}
        setDescription={setDescription}
      />
      <Button
        variant="contained"
        style={{ margin: 15, width: 360 }}
        onClick={handleAddPost}
        disabled={!isFormComplete()} // 모든 필드와 업로드 이미지 조건이 충족되지 않으면 비활성화
      >
        게시물 등록
      </Button>
    </AddPostContainer>
  );
};

const AddPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
`;

const AddPostTitleBox = styled.div`
  display: flex;
  position: fixed;
  top: 0px;
  justify-content: center;
  z-index: 1000;
  border-bottom: 1px solid gray;
  width: 100%;
`;

const BackBtn = styled(IconButton)`
  && {
    position: fixed;
    left: 0; 
    margin: 10.72px;
    z-index: 1100;
  }
`;

export default AddPostPage;