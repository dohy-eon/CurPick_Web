import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log('API 요청 인터셉터 - 토큰:', token);
    if (token) {
      try {
        // JWT 토큰에서 권한 정보 추출
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const tokenData = JSON.parse(jsonPayload);
        console.log('JWT 토큰 payload:', tokenData);

        // 토큰 만료 여부 확인
        const expirationTime = tokenData.exp * 1000; // 밀리초로 변환
        if (Date.now() >= expirationTime) {
          console.log('토큰이 만료되었습니다.');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('authority');
          window.location.href = '/login';
          return Promise.reject('Token expired');
        }

        config.headers.Authorization = `Bearer ${token}`;
        // 권한 정보가 있으면 헤더에 추가
        if (tokenData.auth) {
          config.headers['X-User-Authority'] = tokenData.auth;
        }
      } catch (error) {
        console.error('토큰 디코딩 에러:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('authority');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    console.log('API 요청 헤더:', config.headers);
    return config;
  },
  (error) => {
    console.error('API 요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log('API 응답 성공:', response.status);
    return response;
  },
  async (error) => {
    console.error('API 응답 에러:', error.response?.status, error.response?.data);
    const originalRequest = error.config;

    // 토큰 만료로 인한 401 에러이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 토큰으로 새로운 액세스 토큰 발급
        const refreshToken = localStorage.getItem('refreshToken');
        console.log('리프레시 토큰:', refreshToken);
        
        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다.');
        }

        const response = await axios.post(
          'http://localhost:8080/api/auth/token',
          {},
          {
            headers: {
              'Authorization': `Bearer ${refreshToken}`
            },
            withCredentials: true
          }
        );

        const newAccessToken = response.headers['access-token'];
        console.log('새로운 액세스 토큰:', newAccessToken);
        
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        // 리프레시 토큰도 만료된 경우
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('authority');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 