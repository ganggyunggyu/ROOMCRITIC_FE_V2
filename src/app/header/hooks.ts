// import axiosConfig from "../../config/axios-config";
// import { clearCookie } from "../../shared/lib/cookie";

// export const submitLogout = async (userId) => {
//   const navigate = useNavigate
//   try {
//     const result = await axiosConfig.post('user/auth/logout', { userId });
//     console.log(result);
//     navigator('/');
//     dispatch(setAccessToken(null));

//     clearCookie('refreshToken');
//     clearCookie('accessToken');
//     clearCookie('userId');

//     window.location.reload();
//   } catch (err) {
//     console.log(err);
//   }
// };
