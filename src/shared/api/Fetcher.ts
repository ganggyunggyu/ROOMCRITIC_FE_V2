import axios, { AxiosResponse } from 'axios';
import { HOST } from '../../config/env-config';

export const API_URI = HOST;
interface ErrorResponse {
  message: string;
  // 기타 필요한 속성들을 추가할 수 있습니다.
}

const handleResponse = async <T>(response: AxiosResponse<T>) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  // 오류 응답 처리
  const errorResponse = response.data as ErrorResponse;
  throw new Error(errorResponse.message);
};

const Fetcher = {
  POST: async <T>(endpoint: string, formdata: object): Promise<T> => {
    try {
      const response = await axios.post(`${API_URI}${endpoint}`, formdata, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      return handleResponse<T>(response);
    } catch (error) {
      // 네트워크 오류 등으로 인한 예외 처리
      throw new Error('Network error');
    }
  },
  GET: async <T>(endpoint: string): Promise<T> => {
    try {
      const response = await axios.get(`${API_URI}${endpoint}`, {
        withCredentials: true,
      });
      return handleResponse<T>(response);
    } catch (error) {
      // 네트워크 오류 등으로 인한 예외 처리
      throw new Error('Network error');
    }
  },
};

export default Fetcher;
