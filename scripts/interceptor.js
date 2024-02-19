const axios = require("axios");

const API_URL = "http://localhost:3000";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const api = axios.create({
  baseURL: API_URL,
});

export default api;

// import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm'
// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000',
//   });

//   // Добавляем перехватчик запросов
//   axiosInstance.interceptors.request.use(
//     function(config) {
//       // Получаем доступ к ACCESS_TOKEN из localStorage
//       const accessToken = localStorage.getItem('ACCESS_TOKEN');

//       console.log("Access Token:", accessToken);

//       // Добавляем заголовок авторизации к каждому запросу
//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }

//       return config;
//     },
//     function(error) {
//       // Обработка ошибок при добавлении заголовка
//       return Promise.reject(error);
//     }
//   );
