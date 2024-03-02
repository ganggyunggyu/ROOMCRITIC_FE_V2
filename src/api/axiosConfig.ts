import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://3.37.157.222',
  headers: {
    Authorization: 'Bearer your-token',
  },
  withCredentials: true,
});

export default axiosConfig;
