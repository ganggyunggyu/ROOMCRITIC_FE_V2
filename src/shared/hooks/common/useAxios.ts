import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/store';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://www.togetherlab.co.kr',
  timeout: 10000,
});

const useAxiosInterceptor = () => {
  const { accessToken } = useAppSelector((state) => state.accessToken);

  const navigate = useNavigate();

  const errorHandler = (error) => {
    console.log('errInterceptor!', error);
    if (error.response.status === 401) {
      navigate('/');
    }
    return Promise.reject(error);
  };

  const requestHandler = (config) => {
    config.headers = {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    };
    return config;
  };

  const responseHandler = (response) => {
    return response;
  };

  const requestInterceptor = instance.interceptors.request.use(requestHandler);

  const responseInterceptor = instance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error.response.data),
  );

  React.useEffect(() => {
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
};

export { useAxiosInterceptor, instance };
