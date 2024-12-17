import axios from 'axios';
import { IP_ADDRESS } from '.';

const API_URL = `http://${IP_ADDRESS}:3000/api/review`;

const getReviewById=async(productId:string)=>{
    try {
        const response = await axios.get(`${API_URL}/${productId}`);
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service review id")
        throw error.response.data;
    }
}
const createReview=async(productId:string,rating:number,comment:string,accessToken:string)=>{
    try {
        const response = await axios.post(`${API_URL}/${productId}/reviews`,{
                rating,
                comment
            },
            {
                headers:{
                    Authorization:accessToken,
                }
            }
        );
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service create review")
        throw error.response.data;
    }
}

export const reviewService= {
    getReviewById,
    createReview,
}