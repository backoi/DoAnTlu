import axios from 'axios';
import { IP_ADDRESS } from '.';

const API_URL = `http://${IP_ADDRESS}:3000:3000/api/category`;

const getAll=async()=>{
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data
    } catch (error) {
        
    }
}
export const categoryService= {
    getAll,
}