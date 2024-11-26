import axios from 'axios';
// import { clearCookie, getCookie, setCookie } from '../shared/lib/cookie';
import { HOST } from './env-config';
// import useLogout from '../shared/hooks/auth/useLogout';
// import { useAppDispatch } from '../app/store';
// import { setLoginStatus } from '../app/store/slice/userSlice';
// import { submitLogout } from '../shared/api/api';

export const axiosConfig = axios.create({
  baseURL: HOST,
});

// axiosConfig.interceptors.request.use(
//   async (config) => {
//     const accessToken = getCookie('accessToken');

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// axiosConfig.interceptors.response.use(
//   async (response) => {
//     return response;
//   },
//   async (error) => {
//     const refreshToken = getCookie('refreshToken');

//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         console.log('accessToken 갱신 완료 시도');
//         const userId = getCookie('userId');
//         const accessToken = await refreshAccessToken(userId, refreshToken);
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;

//         console.log('accessToken 갱신 완료 완료');
//         const userInfo = await loginCheck();
//         console.log(userInfo);
//         const dispatch = useAppDispatch();
//         dispatch(setLoginStatus(userInfo));

//         return axiosConfig(originalRequest);
//       } catch (error) {
//         console.log('accessToken 갱신 완료 실패');

//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// export const refreshAccessToken = async (userId: string, refreshToken: string) => {
//   try {
//     const response = await axios.post(
//       `${HOST}/user/auth/access-token`,
//       {
//         userId,
//         refreshToken,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${getCookie('refreshToken')}`,
//         },
//       },
//     );
//     const accessToken = response.data.accessToken;
//     clearCookie('accessToken');
//     setCookie('accessToken', accessToken);
//     return response;
//   } catch (error) {
//     throw new Error('토큰 갱신에 실패했습니다.');
//   }
// };

// export const loginCheck = async () => {
//   try {
//     const result = await axiosConfig.get('/user/login-check');

//     return result.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export default axiosConfig;
