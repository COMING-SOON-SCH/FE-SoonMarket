import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material";
import { Cookies } from "react-cookie";
import { useState, useEffect } from "react";

//페이지 컴포넌트
import LoginPage from "./pages/Auth/LoginPage";
// import Main from "./pages/Main/Main";
// import Recommend from "./pages/Recommend/RecommendPage";
// import BottomNav from "./components/Layout/BottomNav";
// import AddPost from "./pages/AddPost/AddPostPage";
// import MyLike from "./pages/LikePost/LikePage";
// import MyPage from "./pages/MyPage/MyPage";
// import Post from "./pages/Post/PostPage";
// import Search from "./pages/Search/SearchPage";
// import SignUp from "./pages/Auth/SignUpPage";

const theme = createTheme({
  typography: {
    fontFamily: "SUIT-Regular",
  },
});

const cookies = new Cookies();

//RouteConfig type정의
interface RouteConfig {
  element: JSX.Element;
  path: string;
  private?: boolean;
}

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // 로그인 상태

  useEffect(() => {
    const token = cookies.get("access_token");
    setIsAuthenticated(!!token);
  }, []);

  const shouldShowBottomNav = (): boolean => {
    const noBottomNavRoutes = ["/", "/signup", "/signup1", "/post/addpost"];
    return !noBottomNavRoutes.includes(location.pathname);
  };

  const routes: RouteConfig[] = [
    { path: "/", element: <LoginPage setIsAuthenticated={setIsAuthenticated} /> },
    // { path: "/recommend", element: <Recommend />, private: true },
    // { path: "/addpost", element: <AddPost />, private: true },
    // { path: "/like", element: <MyLike />, private: true },
    // { path: "/mypage", element: <MyPage />, private: true },
    // { path: "/main", element: <Main />, private: true },
    // { path: "/post/:id", element: <Post />, private: true },
    // { path: "/search", element: <Search />, private: true },
    // { path: "/signup", element: <SignUp /> },
  ];

  const PrivateRoute = ({ element }: { element: JSX.Element }): JSX.Element => 
    isAuthenticated ? element : <Navigate to="/" replace />;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container>
          <Routes>
            {routes.map((route) =>
              route.private ? (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<PrivateRoute element={route.element} />}
                />
              ) : (
                <Route key={route.path} path={route.path} element={route.element} />
              )
            )}
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Container = styled.div`
  width: 390px;
  height: 844px;
`;

export default App;