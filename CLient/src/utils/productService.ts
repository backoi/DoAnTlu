import axios from 'axios';

const API_URL = 'http://192.168.1.9:3000/api/product';

const getAll=async()=>{
    try {
        const response = await axios.get(`${API_URL}/`);
        return response
    } catch (error) {
        
    }
}
const getProducts=async(search='',category='')=>{
    try {
        const response = await axios.get(`${API_URL}/`,{
            params:{
                search,
                category,
            }
        });
        return response
    } catch (error) {
        
    }
}
const getFeatures= async()=>{
    try {
        const response = await axios.get(`${API_URL}/features`);
        return response
    } catch (error) {
        
    }
}
export const productService= {
    getAll,
    getProducts,
    getFeatures,
}