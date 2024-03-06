import axios from 'axios';

const axiosConfig = axios.create({
  // baseURL: 'http://api.room-critic.online',
  baseURL: 'http://localhost:4000',
  headers: {
    Authorization: 'Bearer your-token',
  },
  withCredentials: true,
});

export default axiosConfig;
