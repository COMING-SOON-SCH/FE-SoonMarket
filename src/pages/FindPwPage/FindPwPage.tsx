import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import FindPwEmailForm from "./components/FindPwEmailForm";

const FindPwPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <FindPasswordContainer>
      <Header>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </IconButton>
        <Title>Soon-Market</Title>
      </Header>
      <FindPwEmailForm />
    </FindPasswordContainer>
  );
};

// Styled Components
const FindPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  position: relative; /* 백 버튼 위치를 위한 상대 위치 지정 */
  padding: 20px 0;
`;

const Title = styled.h1`
  margin: 100px; /* 원하는 margin 값으로 설정 */
`;

export default FindPwPage;