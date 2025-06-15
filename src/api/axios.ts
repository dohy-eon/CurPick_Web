import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 대기 중인 요청들을 저장하는 배열
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰 갱신 완료 후 대기 중인 요청들을 처리하는 함수
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

// 토큰 갱신 실패 시 대기 중인 요청들을 처리하는 함수
const onRefreshError = (error: any) => {
  refreshSubscribers = [];
  localStorage.removeItem('token');
  window.location.href = '/login';
};

// 토큰 갱신 요청을 보내는 함수
const refreshToken = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/auth/token', {
      withCredentials: true
    });
    
    const token = response.headers['authorization'] || response.headers['Authorization'];
    if (token) {
      const cleanToken = token.replace('Bearer ', '');
      localStorage.setItem('token', cleanToken);
      return cleanToken;
    }
    throw new Error('토큰을 찾을 수 없습니다.');
  } catch (error) {
    throw error;
  }
};

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 이미 재시도한 요청이 아닌 경우에만 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중이면 새로운 토큰을 기다림
        try {
          const token = await new Promise<string>((resolve, reject) => {
            refreshSubscribers.push((token) => resolve(token));
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const token = await refreshToken();
        isRefreshing = false;
        onRefreshed(token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        onRefreshError(refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 