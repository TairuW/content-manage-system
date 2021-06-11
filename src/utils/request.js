import { message } from 'antd';
import axios from 'axios';
import { getToken, getUsername } from "./cookies";

const service = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
});

// Add a request interceptor
service.interceptors.request.use(function (config) {
  // Do something before request is sent
  // Token, Username,
  config.headers["Token"] = getToken();
  config.headers["Username"] = getUsername();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
// Any status code that lie within the range of 2xx cause this function to trigger
// Do something with response data
  const data = response.data;
  if (data.resCode !== 0) {
    message.info(data.message);
    return Promise.reject(response);
  } 
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default service;