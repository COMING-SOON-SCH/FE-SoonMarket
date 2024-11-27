import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import styled from "styled-components"

type Description = {
  title: string;
  content: string;
  price: number;
  category: string;
  openchatUrl: string;
  sold: boolean;
}

interface ProductDescriptionInputBoxProps {
  description: Description;
  setDescription: React.Dispatch<React.SetStateAction<Description>>;
}

const ProductDescriptionInputBox: React.FC<ProductDescriptionInputBoxProps> = ({ description, setDescription }) => {
  const categories = ["여성 의류", "남성 의류", "신발", "가방 지갑", "시계", "악세서리", "전자제품", "스포츠/레저", "컬렉션", "취미", "가구", "주방 용품", "식품", "같이 해요", "같이 시켜요", "같이 먹어요", "같이 타요"];

  const handleInputChange = (field: string, value: string) => {
    setDescription((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ContentsBox>
      <InputTitle>제목</InputTitle>
      <DescriptionInput
        variant="outlined"
        placeholder="제품에 대한 간단한 설명을 적어주세요."
        onChange={(e) => handleInputChange('title', e.target.value)}
      />
      <InputTitle>가격</InputTitle>
      <DescriptionInput
        variant="outlined"
        type="number"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">₩</InputAdornment>,
          },
        }}
        onChange={(e) => handleInputChange('price', e.target.value)}
      />
      <InputTitle>내용</InputTitle>
      <DescriptionInput
        variant="outlined"
        multiline
        rows={3}
        onChange={(e) => handleInputChange('content', e.target.value)}
      />
      <InputTitle>오픈채팅방 URL</InputTitle>
      <DescriptionInput
        variant="outlined"
        onChange={(e) => handleInputChange('openchatUrl', e.target.value)}
      />
      <InputTitle>카테고리</InputTitle>
      <Select
        value={description.category}
        onChange={(e) =>
          handleInputChange('category', e.target.value)
        }
        style={{ marginLeft: 15, width: 360 }}
      >
        {
          categories.map((data) => (
            <MenuItem key={data} value={data}>{data}</MenuItem>
          ))
        }
      </Select>
    </ContentsBox>
  )
}

const DescriptionInput = styled(TextField)`
  &&{
    margin-left: 15px;
    width: 360px;
  }
`

const ContentsBox = styled.div`
  width: 100%;
  height: auto;
`;

const InputTitle = styled.h3`
  margin: 5px 0px 5px 20px;
`

export default ProductDescriptionInputBox;