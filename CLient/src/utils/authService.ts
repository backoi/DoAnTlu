import axios from 'axios';
import { User } from '../assets/types/UserType';

const API_URL = 'http://192.168.1.9:3000/api/auth';


const register = async (user: User) => {
    try {
        //console.log(user)
        const response = await axios.post(`${API_URL}/register`, user);
        return response.data;
    } catch (error:any) {
        throw error.response.data
    }
};

const login = async (email: string, password: string) => {
    try {
        //console.log(email)
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error:any)
    {
        //console.log("Lỗi bên service")
        throw error.response.data;
    }
};
const forgotPass = async (email: string) => {
    try {
        //console.log(email)
        const response = await axios.post(`${API_URL}/forgot-password`, { email});
        return response.data;
    } catch (error:any)
    {
        console.log("Lỗi bên service forgotpass",error.response.data)
        throw error.response.data;
    }
};

const changePass = async (email: string,password:string) => {
    try {
        //console.log(email)
        const response = await axios.post(`${API_URL}/change-password`, { email,password});
        return response.data;
    } catch (error:any)
    {
        console.log("Lỗi bên service change pass")
        throw error.response.data;
    }
};
export const authService = {
    register,
    login,
    forgotPass,
    changePass,
};
