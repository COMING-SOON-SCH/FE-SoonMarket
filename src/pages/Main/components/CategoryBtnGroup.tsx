import { Chip } from "@mui/material";
import styled from "styled-components";

interface CategoryBtnGroupProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryBtnGroup: React.FC<CategoryBtnGroupProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ["전체", "여성 의류", "남성 의류", "신발", "가방 지갑", "시계", "악세서리", "전자제품", "스포츠/레저", "컬렉션", "취미", "가구", "주방 용품", "식품", "같이 해요", "같이 시켜요", "같이 먹어요", "같이 타요"];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryBox>
      {categories.map((category) => (
        <Category
          key={category}
          label={category}
          variant="outlined"
          onClick={() => handleCategoryClick(category)}
          isSelected={selectedCategory === category}
        />
      ))}
    </CategoryBox>
  );
};

const CategoryBox = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  padding: 8px 0px;
  width: 90%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface CategoryProps {
  isSelected: boolean;
}

const Category = styled(Chip) <CategoryProps>`
  && {
    margin-right: 8px;
    flex-shrink: 0;
    border-color: ${props => props.isSelected ? '#2D61A6' : 'rgba(0, 0, 0, 0.23)'};
    border-width: ${props => props.isSelected ? '1px' : '1px'};
  }
`;

export default CategoryBtnGroup;