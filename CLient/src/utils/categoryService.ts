import axios from 'axios';

const API_URL = 'http://192.168.1.9:3000/api/category';

const getAll=async()=>{
    try {
        const response = await axios.get(`${API_URL}/`);
        return response
    } catch (error) {
        
    }
}
export const categoryService= {
    getAll,
}