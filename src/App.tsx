import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";

//페이지 컴포넌트
import LoginPage from "./pages/Auth/LoginPage";
import Main from "./pages/Main/Main";
import BottomNav from "./components/Layout/BottomNav";
// import Recommend from "./pages/Recommend/RecommendPage";
// import AddPost from "./pages/AddPost/AddPostPage";
// import MyLike from "./pages/LikePost/LikePage";
// import MyPage from "./pages/MyPage/MyPage";
// import Post from "./pages/Post/PostPage";
// import Search from "./pages/Search/SearchPage";
// import SignUp from "./pages/Auth/SignUpPage";

//Redux
import { setIsAuthenticated } from "./redux/modules/auth";

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
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = document.cookie.includes("access_token");
    dispatch(setIsAuthenticated(!!token));
  }, [dispatch]);

  const PrivateRoute = ({ element }: { element: JSX.Element }): JSX.Element => {
    const token = cookies.get("access_token"); // 토큰 존재 여부 확인
    console.log("토큰있음");
    return token ? element : <Navigate to="/" replace />; // 토큰 없으면 로그인 페이지로 리다이렉트
  };

  const shouldShowBottomNav = (): boolean => {
    const noBottomNavRoutes = ["/", "/signup", "/signup1", "/post/addpost"];
    return !noBottomNavRoutes.includes(location.pathname);
  };

  const routes: RouteConfig[] = [
    { path: "/", element: <LoginPage /> },
    // { path: "/recommend", element: <Recommend />, private: true },
    // { path: "/addpost", element: <AddPost />, private: true },
    // { path: "/like", element: <MyLike />, private: true },
    // { path: "/mypage", element: <MyPage />, private: true },
    { path: "/main", element: <Main />, private: true },
    // { path: "/post/:id", element: <Post />, private: true },
    // { path: "/search", element: <Search />, private: true },
    // { path: "/signup", element: <SignUp /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {shouldShowBottomNav() ? <BottomNav /> : null}
        <Routes>
          {
            routes.map((route) =>
              route.private ? (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<PrivateRoute element={route.element} />}
                />
              ) : (
                <Route key={route.path} path={route.path} element={route.element} />
              )
            )
          }
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  width: 390px;
  height: 844px;
`;

export default App;