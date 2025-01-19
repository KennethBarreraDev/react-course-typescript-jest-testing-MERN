import axios from 'axios';
import { getEnvsVariables } from '../globals/helpers/getEnvVar';

const { VITE_API_URL } = getEnvsVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
});

calendarApi.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`; 
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
});

export default calendarApi;
