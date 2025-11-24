import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // You can add authorization tokens or other headers here if needed
        // Example:
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers['Authorization'] = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors here if needed
        console.error("API error:", error);
        return Promise.reject(error);
    }
);



export default axiosInstance;