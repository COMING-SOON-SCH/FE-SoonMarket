import { Button } from "@mui/material";
import styled from "styled-components";
import useAddChat from "../../../api/Chat/useAddChat";

const BottomBar: React.FC<{postId : number}> = ({postId})  => {
  const addChat = useAddChat();

  const handleAddChat = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addChat(postId);
  }

  return (
    <BottomBtnBox>
      <ChatBtn
        variant="contained"
        onClick={handleAddChat}>
        채팅 하기
      </ChatBtn>
    </BottomBtnBox>
  )
}

const BottomBtnBox = styled.div`
  border-top: 2px solid #F1F1F1;
  position: absolute; /* 부모 컨테이너(AppContainer)의 기준으로 고정 */
  bottom: 0;
  left: 0;
  width: 100%; /* AppContainer의 너비에 맞춤 */
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  && {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const ChatBtn = styled(Button)`
  width: 100%;
  height: 40px;
  && {
    background-color: #bdd9f2;
    color: #000;
  margin: 10px;
  }
`;

export default BottomBar;