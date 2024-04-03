import AxiosConfig from './AxiosConfig';
type TRequestUserInfo = {
  email?: string;
  password?: string;
  displayName?: string;
  phoneNumber?: string;
};

export const submitJoin = async (requestUserInfo: TRequestUserInfo) => {
  try {
    const result = await AxiosConfig.post('/auth/join', {
      email: requestUserInfo.email,
      password: requestUserInfo.password,
      displayName: requestUserInfo.displayName,
      phoneNumber: requestUserInfo.phoneNumber,
    });
    //이메일 또는 패스워드가 중복 되는 경우
    // if (result.status === 201) {
    //   throw new Error(result.data.message);
    // }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailContent = async (contentType: string, contentId: string) => {
  try {
    const result = await AxiosConfig.get(`content/${contentType}/${contentId}`);
    return result;
  } catch (err) {
    console.log(err);
  }
};
