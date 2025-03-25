import axios from "axios";
import { Cookies } from "react-cookie";

// react-cookie 인스턴스 생성
const cookies = new Cookies();

//axios 인스턴스
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 5000,
})

// 토큰 갱신 여부 플래그
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

//새 토큰이 갱신되면 큐에 등록된 요청을 처리
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

// 실패한 요청 큐에 추가하는 함수
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
}

// 요청 인터셉터: 모든 요청에 access_token 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터: 401 처리
axiosInstance.interceptors.response.use(
  (response) => response, // 정상적인 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 갱신 중이라면 대기
        return new Promise(resolve => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers['Authrorization'] = `${token}`;
            resolve(axios(originalRequest));
          })
        })
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentRefreshToken = cookies.get('refresh_token');

        await axios.post(
          `${import.meta.env.VITE_API_URL}/users/reissue`,
          {},
          {
            headers: {
              Authorization: `Bearer ${currentRefreshToken}`,
            }
          }
        ).then(response => {
          // 새 access_token을 쿠키에 저장
          const newAccessToken = response.data.accessToken;

          cookies.set('access_token', newAccessToken, {
            path: '/',
            secure: false,
            httpOnly: false,
            sameSite: 'strict',
          });

          // 새 refresh_token을 쿠키에 저장
          const newRefreshToken = response.data.refreshToken;

          cookies.set("refresh_token", newRefreshToken, {
            path: "/",
            httpOnly: false,
            secure: false,
            sameSite: "strict",
          });

          // 대기 중인 요청 처리
          onRefreshed(newAccessToken);

          // 원래 요청 재시도
          originalRequest.headers['Authorization'] = `${newAccessToken}`;
          return axiosInstance(originalRequest);
        })


      } catch (refreshError) {
        // Refresh 실패 시 처리 (예: 로그아웃)
        console.error('Refresh token failed', refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    

    return Promise.reject(error);
  }
)

export default axiosInstance;