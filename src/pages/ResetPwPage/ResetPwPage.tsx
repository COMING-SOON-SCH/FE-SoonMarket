import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, TextField, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import useChangePassword from "../../api/Auth/useChangePw";
import useResetPassword from "../../api/Auth/useResetPw";

const ResetPwPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const navigate = useNavigate();
  const resetPassword = useResetPassword();
  const changePassword = useChangePassword();
  
  useEffect(() => {
  }, [navigate]);

  const validatePassword = (value: string): boolean =>
    /^(?=.*[a-z])(?=.*[\W])(?=.*\d)[a-zA-Z\d\W]{8,16}$/.test(value);

  const handleSubmit = async () => {
    if (isSubmitting) return;
  
    setIsSubmitting(true);
    setPasswordError("");
    setConfirmPasswordError("");
  
    let hasError = false;
  
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    } else if (!validatePassword(password)) {
      setPasswordError("영문, 숫자, 특수문자를 포함 8~16자로 설정해주세요.");
      hasError = true;
    }
  
    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      hasError = true;
    }
  
    if (hasError) {
      setIsSubmitting(false);
      return;
    }
  
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (!token) {
        changePassword(password);
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate(-1);
      }
      else {
        await resetPassword(token, password);
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/");

      }
    } catch (error) {
      console.error("비밀번호 재설정 중 오류 발생:", error);
      alert("비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Caps Lock 감지
    if (e.getModifierState("CapsLock") && !isCapsLockOn) {
      setIsCapsLockOn(true);
    } else if (!e.getModifierState("CapsLock") && isCapsLockOn) {
      setIsCapsLockOn(false);
    }
  };

  return (
    <FormContainer>
      <Header>
        <BackButton>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        </BackButton>
        <Title>Soon-Market</Title>
      </Header>
      <SubTitle>새로운 비밀 번호를 입력해주세요.</SubTitle>
      {/* 비밀번호 입력 */}
      <TextFieldContainer1>
        <StyledTextField
          label="비밀번호"
          variant="filled"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <IconButton onClick={() => setPassword("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer1>
      {isCapsLockOn && <StatusText>Caps Lock이 켜져있습니다.</StatusText>}
      {passwordError && <ErrorText>{passwordError}</ErrorText>}

      {/* 비밀번호 확인 */}
      <TextFieldContainer>
        <StyledTextField
          label="비밀번호 확인"
          variant="filled"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <IconButton onClick={() => setConfirmPassword("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>
      {confirmPasswordError && <ErrorText>{confirmPasswordError}</ErrorText>}

      {/* 제출 버튼 */}
      <SubmitButton onClick={handleSubmit}>비밀번호 변경</SubmitButton>
    </FormContainer>
  );
};

export default ResetPwPage;

/* 스타일 코드 */
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'SUIT', sans-serif;
`;

const SubTitle = styled.div`
  font-size: 14px;
  margin-bottom: 0px;
`;

const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const BackButton = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
`;

const Title = styled.h1`
  margin: 100px;
  font-family: 'SUIT', sans-serif;
`;

const TextFieldContainer = styled.div`
  display: flex;
  align-items: center;
  background: #bdd9f2;
  width: 350px;
  margin: 20px;
  border-radius: 4px;
`;

const TextFieldContainer1 = styled.div`
  display: flex;
  align-items: center;
  background: #bdd9f2;
  width: 350px;
  margin: 20px;
  border-radius: 4px;
  margin-top: 0px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  && .MuiFilledInput-root {
    background: #bdd9f2;
  }
  && .MuiFilledInput-underline:before,
  && .MuiFilledInput-underline:after {
    display: none;
  }
`;

const SubmitButton = styled(Button)`
  && {
    border-radius: 20px;
    width: 350px;
    background: #d9e9f9;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.75rem;
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
  width: 350px;
`;

const StatusText = styled.div`
  color: #888;
  font-size: 0.75rem;
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
  width: 350px;
`;
