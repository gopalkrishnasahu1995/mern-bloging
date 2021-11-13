import axios from 'axios';
import { toast } from 'react-toastify'


const BASE_URL = process.env.SERVER_URI || "http://localhost:8000"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    // timeout: 1000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    withCredentials: false,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    console.log(error, "Request error")
    toast.error(error.message)
    return Promise.reject(error);
});

// Add a response interceptor
// axiosInstance.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     console.log(error.message,"Response error")
//     return Promise.reject(error);
// });

axiosInstance.interceptors.response.use(null, error => {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500
    if (!expectedErrors) {
        console.log('logging error', error)
        toast.error("An unexpected error occured!")
    }
    return Promise.reject(error)
})

export default axiosInstance