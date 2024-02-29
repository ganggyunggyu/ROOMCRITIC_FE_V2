import { KAKAOREST } from '../../env-config';

const useKakaoLogin = () => {
  const redirectKakao = () => {
    const redirect_uri = 'http://localhost:3000/auth'; //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAOREST}&redirect_uri=${redirect_uri}&response_type=code&scope=friends`;
    window.location.href = kakaoURL;
  };
  return { redirectKakao };
};

export default useKakaoLogin;
