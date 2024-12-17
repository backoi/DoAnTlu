import axios from 'axios';
import { IP_ADDRESS } from '.';

const API_URL = `http://${IP_ADDRESS}:3000/api/category`;

const getAll=async()=>{
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service get all categories")
        throw error.response.data;
    }
}
export const categoryService= {
    getAll,
}