import axios from 'axios';

const BASE_URL = process.env.SERVER_URI || "http://localhost:8000/api/v1"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
})

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    console.log(error.message,"Request error")
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error.message,"Response error")
    return Promise.reject(error);
});
export default axiosInstance