import axios from 'axios';

const service = axios.create({
  baseURL: 'https://tmax.datahunter.cn/',
  timeout: 5 * 60 * 1000
});

// localStorage.setItem('AUTH', 'Rehvy0jjvVRVvMun5lrtZB5DBRUhWxwTgBvckPcP9/gEq+vAjcjI2kUZgC4ZzBedBNR9WWERVmTg7hGgKrqV5xqD7o7TedkG')

// request interceptor
service.interceptors.request.use(
  config => {
    // if (window.localStorage.getItem('AUTH') === process.env.REACT_APP_AUTH) {
    //   return config;
    // } else {
    //   Promise.reject(new Error('无权限'));
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 200) {
      return res.msg;
    } else {
      // Message.error(res.msg);
      return Promise.reject(new Error(res.msg));
    }
  },
  error => {
    console.error(error);
    // Message.error(error.message);
    // Do something with response error
    return Promise.reject(error);
  }
);

export default service;
