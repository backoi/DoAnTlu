import { User } from '../assets/types/UserType';

import useAxiosService from "./axiosService";

const axios=useAxiosService()
const register = async (user: User) => {
    try {
        //console.log(user)
        const response = await axios.post(`api/auth/register`, user);
        return response.data;
    } catch (error:any) {
        throw error.response.data
    }
};

const login = async (email: string, password: string) => {
    try {
        //console.log(email)
        const response = await axios.post(`api/auth/login`, { email, password });
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
        const response = await axios.post(`api/auth/forgot-password`, { email});
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
        const response = await axios.post(`api/auth/change-password`, { email,password});
        return response;
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
