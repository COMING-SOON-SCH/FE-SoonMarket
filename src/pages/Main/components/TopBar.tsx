import { Badge, IconButton } from "@mui/material"
import styled from "styled-components";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  }

  return (
    <TopBarContainer>
      <SearchBarContainer onSubmit={handleSearch}>
        <Input type="text" placeholder="검색어 입력" onChange={(e) => setSearchQuery(e.target.value)} />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </SearchBarContainer>
      <AlarmBadge color="secondary" variant="dot" sx={{ width: "30px", height: "30px" }}>
        <NotificationsNoneOutlinedIcon sx={{ width: "30px", height: "30px" }} />
      </AlarmBadge>
    </TopBarContainer>
  )
}

const SearchBarContainer = styled.form`
	display: flex;
	align-items: center;
	background-color: #f5f5f5; 
	border-radius: 20px; 
	padding: 5px 10px; 
	width: 270px;
	height: 20px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
	margin: 10px;
`;

const Input = styled.input`
	border: none; 
	background: none; 
	outline: none; 
	padding: 10px; 
	flex: 1; 
	font-size: 14px; 
	color: #757575; 
	
	::placeholder {
		color: #bdbdbd; 
	}
`;

const TopBarContainer = styled.div`
	width: 100%;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
`

const AlarmBadge = styled(Badge)`
	&& .MuiBadge-dot {
		background-color: #2D61A6;
	}
`

export default TopBar;