import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 3000,
});

axiosInstance.interceptors.request.use(
    async config => {

        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
