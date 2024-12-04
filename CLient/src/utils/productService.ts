import axios from 'axios';

const API_URL = 'http://192.168.1.13:3000/api/product';

const getAll=async()=>{
    try {
        const response = await axios.get(`${API_URL}/`);
        return response
    } catch (error) {
        
    }
}
const getProductWithID= async(id:any)=>{
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response
    } catch (error) {
        
    }
}

const getProducts=async(search='',category='',minPrice?:number,maxPrice?:number,minRate?:number)=>{
    try {
        const response = await axios.get(`${API_URL}/`,{
            params:{
                search,
                category,
                minPrice,
                maxPrice,
                minRate,
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
    getProductWithID,
}