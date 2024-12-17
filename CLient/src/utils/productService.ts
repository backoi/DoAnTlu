import axios from 'axios';
import { IP_ADDRESS } from '.';

const API_URL = `http://${IP_ADDRESS}:3000/api/product`;

const getAll=async()=>{
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service get all product")
        throw error.response.data;
    }
}
const getProductWithID= async(id:any)=>{
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service get product with id")
        throw error.response.data;
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
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service filter")
        throw error.response.data;
    }
}
const getFeatures= async()=>{
    try {
        const response = await axios.get(`${API_URL}/features`);
        //console.log('data',response.data)
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service get features")
        throw error.response.data;
    }
}
export const productService= {
    getAll,
    getProducts,
    getFeatures,
    getProductWithID,
}