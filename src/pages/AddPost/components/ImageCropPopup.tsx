import React, { useState, useRef } from "react";
import ReactCrop, { PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import styled from "styled-components";

interface ImageCropPopupProps {
  src: string;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
}

const ImageCropPopup: React.FC<ImageCropPopupProps> = ({ src, onClose, onCropComplete }) => {
  const [crop, setCrop] = useState<PixelCrop>({ unit: "px", x: 25, y: 25, width: 300, height: 300 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>({ unit: "px", x: 25, y: 25, width: 300, height: 300 });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageLoad = (img: HTMLImageElement) => {
    imgRef.current = img;
  };

  const generateCroppedImage = async () => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      return;
    }

    const canvas = previewCanvasRef.current;
    const image = imgRef.current;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // 캔버스 크기를 원본 크기로 설정
    canvas.width = completedCrop.width! * scaleX;
    canvas.height = completedCrop.height! * scaleY;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // 고품질 설정
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 이미지 그리기
    ctx.drawImage(
      image,
      completedCrop.x! * scaleX,
      completedCrop.y! * scaleY,
      completedCrop.width! * scaleX,
      completedCrop.height! * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Blob 생성 (최대 품질)
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
          onCropComplete(file);
          onClose();
        }
      },
      "image/jpeg",
      1 // 최대 품질
    );
  };

  return (
    <PopupOverlay>
      <PopupContainer>
        <h2>이미지 자르기</h2>
        <CropWrapper>
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(newCrop) => setCompletedCrop(newCrop)}
            aspect={1} // 1:1 비율 유지
          >
            <CropImage
              src={src}
              onLoad={(e) => handleImageLoad(e.currentTarget)}
              alt="Crop preview"
            />
          </ReactCrop>
        </CropWrapper>
        <CanvasPreview ref={previewCanvasRef} style={{ display: "none" }} />
        <ButtonContainer>
          <button onClick={onClose}>취소</button>
          <button onClick={generateCroppedImage}>저장</button>
        </ButtonContainer>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default ImageCropPopup;

// Styled Components
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 350px;
  max-height: 550px;
  text-align: center;
  overflow: hidden;
`;

const CanvasPreview = styled.canvas`
  display: none;
`;

const CropWrapper = styled.div`
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CropImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* 이미지 비율 유지 */
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  }
`;