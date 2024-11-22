import React, { useState, FC, FormEvent } from "react";
import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, IconButton, TextField } from "@mui/material";
import useLogin from "../../../api/Auth/useLogin";

interface LoginFormProps{
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: FC<LoginFormProps> = ({ setIsAuthenticated }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const login = useLogin();

  const validateEmail = (value: string) => {
    const schDomainRegex = /^[a-zA-Z0-9._%+-]+@sch\.ac\.kr$/;
    return schDomainRegex.test(value);
  }

  const handleEmailBlur = () => {
    if (!id) {
      // 필드가 비어있으면 에러 초기화
      setEmailError("");
      return;
    }
    if (!validateEmail(id)) {
      setEmailError("이메일은 @sch.ac.kr 도메인만 허용됩니다.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validateEmail(id)) {
      setEmailError("이메일은 @sch.ac.kr 도메인만 허용됩니다.");
      return;
    }

    try {
        await login(id, password);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
  };

  return (
    <LoginFormBox onSubmit={handleSubmit}>
      <TextFieldContainer>
        <LoginTextField
            type="email"
            variant="filled"
            label="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onBlur={handleEmailBlur}
            error={!!emailError}
            helperText={emailError}
          />
        <IconButton onClick={() => setId("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>
      <TextFieldContainer>
        <LoginTextField
          variant="filled"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <IconButton onClick={() => setPassword("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>
      <SubmitButton variant="contained" type="submit">
        로그인
      </SubmitButton>
    </LoginFormBox>
  );
};

const LoginFormBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextFieldContainer = styled.div`
  display: flex;
  align-items: center;
  background: #bdd9f2;
  width: 350px;
  margin: 20px;
  border-radius: 4px;
`;

const LoginTextField = styled(TextField)`
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
    background: #2d61a6;
  }
`;

export default LoginForm;