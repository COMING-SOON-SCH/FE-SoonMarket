import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, IconButton, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import useLogin from "../../../api/Auth/useLogin";

const LoginForm: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [loginError, setLoginError] = useState("");
  const login = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let err = 0;
    setLoginError("");
    if (!id) {
      setIdError("아이디를 입력해주세요");
      err++;
    } else {
      setIdError("");
    }
    if (!password) {
      setPwError("비밀번호를 입력해주세요");
      err++;
    } else {
      setPwError("");
    }
    if (err === 0) {
      try {
        const fullEmail = `${id}@sch.ac.kr`;
        await login(fullEmail, password);
      } catch (error: any) {
        if (error.message === "401Error") {
          console.log(error.message);
          setLoginError("아이디 혹은 비밀번호가 정확하지 않습니다.");
        }
        else {
          setLoginError("로그인 중 예기치 않은 오류가 발생했습니다.");
        }
      }
    }
  }

  return (
    <LoginFormBox onSubmit={handleSubmit}>
      <TextFieldContainer>
        <LoginTextField
          type="text"
          variant="filled"
          label="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          error={!!idError}
          helperText={idError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span style={{ color: "gray", marginRight: "8px" }}>@sch.ac.kr</span>
              </InputAdornment>
            ),
          }}
        />
        <IconButton onClick={() => setId("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>
      <StatusMessage>아이디는 <b>순천향대학교 이메일</b> 형식입니다.</StatusMessage>

      <TextFieldContainer>
        <LoginTextField
          variant="filled"
          label="비밀번호"
          type="password"
          value={password}
          error={!!pwError}
          helperText={pwError}
          onChange={(e) => setPassword(e.target.value)}
        />
        <IconButton onClick={() => setPassword("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>

      <SubmitButton variant="contained" type="submit">
        로그인
      </SubmitButton>
      {loginError ? <ErrorMessage>{loginError}</ErrorMessage> : <ErrorMessage></ErrorMessage>}
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
  margin: 20px 0px 0px 0px;
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
    margin: 20px 0px 0px 0px;
    border-radius: 20px;
    width: 350px;
    background: #2d61a6;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 10px 0;
`;

const StatusMessage = styled.p`
  color: black;
  font-size: 14px;
  margin-right: auto;
`;

export default LoginForm;
