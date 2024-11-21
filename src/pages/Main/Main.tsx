import styled from "styled-components";
import schoolImg from "../../assets/soonchunhyangUniversity.jpg";
import TopBar from "./components/TopBar";
import CategoryPost from "./components/CategoryPost";

const Main: React.FC = () => {
  return (
    <MainPageContainer>
      <TopBar />
      <SchoolImg src={schoolImg} alt="학교" />
      <CategoryPost />
    </MainPageContainer>
  )
}

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`;

const SchoolImg = styled.img`
  border-radius: 15px;
`

export default Main;