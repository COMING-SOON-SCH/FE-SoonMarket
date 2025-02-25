import styled from "styled-components"
import useGetChatRoom from "../../api/Chat/useGetChatRoom";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import useGetPost from "../../api/Post/useGetPost";
import useGetUserInfo from "../../api/Auth/useGetUserInfo";
import { User } from "../../type/userType";
import { MessageType } from "../../type/chatType";
import useDeleteChat from "../../api/Chat/useDeleteChat";
import useChat from "../../api/Chat/useChat";
import useGetChatMsg from "../../api/Chat/useGetChatMsg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useFileUpload from "../../api/Chat/useFileUpload";

const ChatRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const { chatRoom, getChatRoom, error, loading } = useGetChatRoom();
  const { messages: fetchedMessages } = useGetChatMsg(roomId || "");
  const { post, getPost } = useGetPost();
  const { userInfo, getUserInfo } = useGetUserInfo();
  const deleteChat = useDeleteChat();
  const { messages: stompMessages, sendMessage } = useChat(roomId || "");
  const [inputMessage, setInputMessage] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  const userId = Number(useSelector((state: RootState) => state.auth.userId));
  const [opponent, setOpponent] = useState<User | null>(null);

  const { fileUpload } = useFileUpload();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (roomId) {
      getChatRoom(roomId);
    }
  }, [roomId, getChatRoom]);

  useEffect(() => {
    if (!chatRoom) return;
    if (chatRoom.postId === null) return;
    console.log(chatRoom.postId);
    getPost(chatRoom.postId.toString());
    getUserInfo(userId);

    console.log(post);
    const opponentId = chatRoom.authorId === userId ? chatRoom.buyerId : chatRoom.authorId;
    
    getUserInfo(opponentId).then((user) => {
      setOpponent(user);
    });

  }, [chatRoom, getPost, getUserInfo]);

  useEffect(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        const chatContainer = chatContainerRef.current;
        const inputContainerHeight = 50;
    
        chatContainer.scrollTop = chatContainer.scrollHeight - inputContainerHeight;
      }
    }, 100);
  }, [fetchedMessages, stompMessages]);

  useEffect(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        const chatContainer = chatContainerRef.current;
        const inputContainerHeight = 50;
    
        chatContainer.scrollTop = chatContainer.scrollHeight - inputContainerHeight;
      }
    }, 100);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedImage) return;
    if (!userInfo) return;
  
    let fileUrl = null;
    if (selectedImage && roomId) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      
      const uploadedUrl = await fileUpload(roomId, formData);
      if (!uploadedUrl) {
        alert("이미지 업로드에 실패했습니다.");
        return;  // 이미지 업로드 실패 시 메시지 전송 안 함
      }
  
      fileUrl = uploadedUrl; // URL 저장
      setSelectedImage(null);
      setPreviewUrl(null);
    }
  
    const chatMessage = {
      type: MessageType.TALK,
      roomId: roomId || "",
      senderId: userId,
      message: inputMessage,
      nickname: userInfo.nickname,
      fileUrl, // 🔥 이미지 URL 포함
    };
  
    sendMessage(chatMessage);
    setInputMessage("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  
  const togglePopup = () => {
    if (!showPopup) {
      setShowPopup(true);
      setTimeout(() => setIsPopupVisible(true), 10);
    } else {
      setIsPopupVisible(false);
      setTimeout(() => setShowPopup(false), 300);
    }
  };

  const handleBlockUser = () => {
    alert(`${opponent?.nickname}님을 차단했습니다.`);
    setShowPopup(false);
  };

  const handleReportUser = () => {
    alert(`${opponent?.nickname}님을 신고했습니다.`);
    setShowPopup(false);
  };

  const handleLeaveChat = async () => {
    const confirmDelete = window.confirm("정말로 나가시겠습니까?");
    if (confirmDelete && chatRoom) {
      try {
        await deleteChat(chatRoom.roomId);
        alert("채팅방을 나갔습니다.");
      } catch (error) {
        console.error("채팅방 나가기 실패:", error);
        alert("채팅방 나가기에 실패했습니다.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Header>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <RoomTitle>{opponent?.nickname || "채팅방"}</RoomTitle>
        <IconButton onClick={togglePopup}>
          <MenuIcon />
        </IconButton>
      </Header>

      {post && (
        <PostInfoContainer onClick={() => navigate(`/post/${post.postId}`)}>
          <PostImage src={post.images?.[0]?.imageUrl || "/default-image.jpg"} alt="post" />
          <PostDetails>
            <PostTitle>{post.title}</PostTitle>
            <PostPrice>{post.price.toLocaleString()}원</PostPrice>
          </PostDetails>
        </PostInfoContainer>
      )}

      <ChatContainer ref={chatContainerRef}>
        {[...fetchedMessages, ...stompMessages].map((msg, index) => (
          <ChatBubble key={index} isMine={msg.senderId === userId}>
            {msg.senderId !== userId && <Nickname>{opponent?.nickname}</Nickname>}
            {msg.fileUrl && <ChatImage src={msg.fileUrl} alt="Uploaded" />}
            <Message>{msg.message}</Message>
          </ChatBubble>
        ))}
      </ChatContainer>

      <InputContainer hasImage={!!selectedImage}>
        {selectedImage && (
          <ImagePreviewContainer>
            <PreviewImageWrapper>
              <PreviewImage src={previewUrl || ""} alt="미리보기" />
              <DeleteButton onClick={handleRemoveImage}>
                <CloseIcon fontSize="small" />
              </DeleteButton>
            </PreviewImageWrapper>
          </ImagePreviewContainer>
        )}
        <StyledInputWrapper>
          <IconButton component="label">
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            <ImageIcon />
          </IconButton>
          <StyledInput
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요"
          />
          <SendButton onClick={handleSendMessage}>
            <SendIcon />
          </SendButton>
        </StyledInputWrapper>
      </InputContainer>
      {showPopup && (
        <PopupOverlay isVisible={isPopupVisible} onClick={togglePopup}>
          <PopupContainer isVisible={isPopupVisible} onClick={(e) => e.stopPropagation()}>
            <PopupButton onClick={handleBlockUser}>차단하기</PopupButton>
            <PopupButton onClick={handleReportUser}>신고하기</PopupButton>
            <PopupButton onClick={handleLeaveChat}>나가기</PopupButton>
          </PopupContainer>
        </PopupOverlay>
      )}
    </Container>
  );
};

export default ChatRoomPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100dvh;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const RoomTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ChatContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const PopupOverlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};
  transition: opacity 0.3s ease-in-out;
`;

const PopupContainer = styled.div<{ isVisible: boolean }>`
  background: white;
  max-width: 400px;
  width: 100%;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transform: ${({ isVisible }) => (isVisible ? "translateY(0%)" : "translateY(100%)")};
  transition: transform 0.3s ease-in-out;
`;

const PopupButton = styled.button<{ danger?: boolean }>`
  width: 100%;
  padding: 12px;
  border: none;
  background: #f5f5f5;
  color: black;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
`;

const Nickname = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: gray;
  margin-bottom: 3px;
`;

const Message = styled.div`
  font-size: 16px;
`;

const ChatImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 10px;
  margin-bottom: 5px;
  object-fit: cover;
  cursor: pointer;
`;

const InputContainer = styled.div<{ hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-top: 1px solid #ccc;
  padding: 10px;
  height: ${({ hasImage }) => (hasImage ? "130px" : "50px")}; /* 이미지 있을 때 높이 확장 */
  transition: height 0.3s ease-in-out;
  position: relative;
  background: white;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: flex-start;  /* 왼쪽 정렬 */
  padding: 5px 0;
`;

const PreviewImageWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  margin: 0 10px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  background: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 16px;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
`;

const PostInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  transition: background 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background: #e9ecef;
  }
`;

const PostImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 10px;
`;

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const PostPrice = styled.div`
  font-size: 12px;
  color: #888;
`;

const ChatBubble = styled.div<{ isMine: boolean }>`
  max-width: 70%;
  padding: 10px;
  margin: 5px 10px;
  border-radius: 15px;
  word-wrap: break-word;
  align-self: ${({ isMine }) => (isMine ? "flex-end" : "flex-start")};
  background-color: ${({ isMine }) => (isMine ? "#007bff" : "#f1f1f1")};
  color: ${({ isMine }) => (isMine ? "white" : "black")};
  display: flex;
  flex-direction: column;
`;