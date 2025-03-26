import React, { useState } from "react";
import styled from "styled-components";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { useDispatch } from "react-redux";
import usePwCode from "../../../api/Auth/usePwCode";
import { setUserEmail } from "../../../redux/modules/auth";

const FindPwEmailForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const { sendEmail } = usePwCode();
  const dispatch = useDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(null);
  };

  const handleBlur = () => {
    if (!email) setEmailError("이메일을 입력해주세요.");
    if (email.includes('@')) setEmailError("이메일 도메인을 작성하지 않으셔도 됩니다.");
  };

  const handleSendEmail = async () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }
    if (email.includes('@')) {
      setEmailError("이메일 도메인을 작성하지 않으셔도 됩니다.");
      return;
    }
    setIsSending(true);
    try {
      await sendEmail(email.concat('@sch.ac.kr'));
      setIsEmailSent(true);
      dispatch(setUserEmail(email));
    } catch (error) {
      console.error("이메일 발송 실패", error);
      setEmailError("이메일 발송에 실패했습니다.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <FormContainer>
      <SubTitle>비밀번호 변경을 위해 이메일을 작성해주세요.</SubTitle>
      <TextFieldContainer>
        <StyledTextField
          label="이메일"
          variant="filled"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlur}
          error={!!emailError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span style={{ color: "gray", marginRight: "8px" }}>@sch.ac.kr</span>
              </InputAdornment>
            ),
          }}
        />
        <IconButton onClick={() => setEmail("")}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </TextFieldContainer>
      {isSending ? (
        <StatusContainer>
          <StatusText>발송 중...</StatusText>
        </StatusContainer>
      ) : isEmailSent ? (
        <StatusContainer>
          <StatusText>발송 완료</StatusText>
          <MailButton onClick={() => window.open("https://mail.sch.ac.kr", "_blank")}>
            메일함 이동하기
          </MailButton>
        </StatusContainer>
      ) : emailError ? (
        <ErrorText>{emailError}</ErrorText>
      ) : null}
      <ButtonContainer>
        <StyledButton onClick={handleSendEmail} disabled={isSending}>
          이메일 발송
        </StyledButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default FindPwEmailForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitle = styled.div`
  font-size: 14px;
  margin-bottom: 15px;
`;

const TextFieldContainer = styled.div`
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  && {
    border-radius: 20px;
    background: #d9e9f9;
    color: black;
    width: 50%;
  }
`;

const StatusText = styled.div`
  color: #888;
  font-size: 0.75rem;
  text-align: left;
`;


const ErrorText = styled.div`
  color: red;
  font-size: 0.75rem;
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
  width: 350px;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  heigth: 30px;
  margin-top: -10px;
  padding: 0px 5px;
`;

const MailButton = styled.button`
  background: #2575fc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #1a5cb7;
  }
`;