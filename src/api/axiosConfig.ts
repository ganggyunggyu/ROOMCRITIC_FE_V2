import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://api.room-critic.online',
  headers: {
    Authorization: 'Bearer your-token',
  },
  withCredentials: true,
});

export default axiosConfig;
