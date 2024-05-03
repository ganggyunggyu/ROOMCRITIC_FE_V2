import { JoinRequestDTO, LoginRequestDTO } from '../../app/types/dtos';
import AxiosConfig from '../../config/axios-config';

export const join = async (joinUserDTO: JoinRequestDTO) => {
  try {
    const result = await AxiosConfig.post('/auth/join', {
      ...joinUserDTO,
    });
    return result;
  } catch (error) {
    console.debug(error);
  }
};

export const login = async (loginUserDTO: LoginRequestDTO) => {
  try {
    const result = await AxiosConfig.post('/auth/login', loginUserDTO);
    console.debug(result);
    return result;
  } catch (error) {
    console.debug(error);
    throw Error(error.response.data);
  }
};
