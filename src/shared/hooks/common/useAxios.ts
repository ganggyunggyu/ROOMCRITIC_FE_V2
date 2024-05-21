// import { useNavigate } from 'react-router-dom';
// import axiosConfig, { refreshAccessToken } from '../../../config/axios-config';
// import { getCookie } from '../../lib/cookie';
// import { useAppSelector } from '../../../app/store';
// import { useEffect } from 'react';

// const useAxiosInterceptor = () => {
//   const navigate = useNavigate();
//   const accessToken = useAppSelector((state) => state.accessToken);
//   const { userId } = useAuth();
//   const requestHandler = (config) => {
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   };

//   const responseHandler = (response) => {
//     return response;
//   };

//   const responseErrorHandler = async (error) => {
//     const refreshToken = getCookie('refreshToken');

//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const accessToken = await refreshAccessToken(userId, refreshToken);

//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;

//         return axiosConfig(originalRequest);
//       } catch (error) {
//         console.error('토큰 갱신에 실패했습니다.');
//         navigate('/login');
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   };
//   const requestInterceptor = axiosConfig.interceptors.request.use(requestHandler);

//   const responseInterceptor = axiosConfig.interceptors.response.use(
//     (response) => responseHandler(response),
//     (error) => responseErrorHandler(error.response.data),
//   );

//   useEffect(() => {
//     return () => {
//       axiosConfig.interceptors.request.eject(requestInterceptor);
//       axiosConfig.interceptors.response.eject(responseInterceptor);
//     };
//   }, [responseInterceptor, requestInterceptor]);
// };
// export { useAxiosInterceptor };
