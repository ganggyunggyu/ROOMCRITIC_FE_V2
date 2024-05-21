import { JoinRequestDTO, LoginRequestDTO } from '../../../app/types/dtos';
import { axiosConfig } from '../../../test/axios-config';
// import AxiosConfig from '../../../config/axios-config';

export const submitJoin = async (joinUserDTO: JoinRequestDTO) => {
  try {
    const result = await axiosConfig.post('/auth/join', {
      ...joinUserDTO,
    });
    return result;
  } catch (error) {
    console.debug(error);
  }
};

export const submitLogin = async (loginUserDTO: LoginRequestDTO) => {
  try {
    const result = await axiosConfig.post('/auth/login', loginUserDTO);
    console.debug(result);
    return result;
  } catch (error) {
    console.debug(error);
    throw Error(error.response.data);
  }
};
