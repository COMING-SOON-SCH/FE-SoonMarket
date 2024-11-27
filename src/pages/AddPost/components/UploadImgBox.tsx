import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useRef } from 'react';
import styled from 'styled-components';

// 업로드된 이미지 타입 정의
interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

// Props 타입 정의
interface UploadImgBoxProps {
  uploadImg: UploadedImage[];
  setUploadImg: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

const UploadImgBox: React.FC<UploadImgBoxProps> = ({ uploadImg, setUploadImg }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // 파일 배열로 변환
    const imageFiles = files.map(file => ({
      id: file.name + file.size,
      url: URL.createObjectURL(file),
      file: file, // 파일 객체 저장
    }));

    setUploadImg(prev => {
      const newImages = [...prev];
      imageFiles.forEach((imageFile) => {
        if (!newImages.find(img => img.id === imageFile.id)) {
          newImages.push(imageFile);
        }
      });
      return newImages.slice(0, 10);
    });

    e.target.value = ''; // 파일 입력 초기화
  };

  // ImageInputBox 클릭 시 파일 입력창을 열기 위한 핸들러
  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {
        uploadImg.length ? (
          <ImageGrid>
            {uploadImg.length < 10 && (
              <ImageInputBox onClick={handleBoxClick}>
                <CameraAltOutlinedIcon style={{ fontSize: "60px", margin: "30px 0px 5px 0px" }} />
                <h4 style={{ margin: 0 }}>{uploadImg.length}/10</h4>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </ImageInputBox>
            )}
            {uploadImg.map((imgFiles, index) => (
              <ImagePreview key={index} src={imgFiles.url} alt={`upload-${index}`} />
            ))}
          </ImageGrid>
        ) : (
          <ImageInputBox onClick={handleBoxClick}>
            <CameraAltOutlinedIcon style={{ fontSize: "60px", margin: "30px 0px 5px 0px" }} />
            <h4 style={{ margin: 0 }}>{uploadImg.length}/10</h4>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </ImageInputBox>
        )
      }
    </>
  );
};

// Styled Components
const ImageGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  width: 100%;
  padding-bottom: 10px;

  /* Hide scrollbar for WebKit and Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const ImagePreview = styled.img`
  width: 150px;
  height: 150px;
  margin: 10px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;

const ImageInputBox = styled.div`
  width: 150px;
  height: 150px;
  background: #cccccc;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  flex-shrink: 0; //아이템 강제 축소 막기

  input[type="file"] {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

export default UploadImgBox;