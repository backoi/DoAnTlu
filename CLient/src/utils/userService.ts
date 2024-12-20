import axios from 'axios';
import { IP_ADDRESS } from '.';

const API_URL = `http://${IP_ADDRESS}:3000/user/profile`;

const getInfor=async(accessToken:any)=>{
    try {
        const response = await axios.get(`${API_URL}/`,{
            headers:{
                Authorization:accessToken,
            }
        });
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service get infor")
        throw error.response.data;
    }
}
export const userService= {
    getInfor,
}