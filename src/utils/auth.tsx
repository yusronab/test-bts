import axios from "axios";

const BASE_URL = 'http://94.74.86.174:8080/api';

export const doRegister = async (username: string, password: string, email: string) => {
    const result  = await axios.post(BASE_URL + '/register', { username, password, email });

    return result;
}

export const doLogin = async (username: string, password: string) => {
    const result  = await axios.post(BASE_URL + '/login', { username, password });

    if (result.data.statusCode === 2110) {
        localStorage.setItem('yusronTokenBts', result.data.data.token);
    }

    return result;
}

export const isAuthorize = () => {
    const token = localStorage.getItem('yusronTokenBts');
    
    if (token) return token;

    return false;
}