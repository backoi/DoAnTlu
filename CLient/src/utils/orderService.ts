import axios from 'axios';
import { IP_ADDRESS } from '.';

const API_URL = `http://${IP_ADDRESS}:3000/user/order`;

const getUserOrders=async(accessToken:string)=>{
    try {
        const response = await axios.get(`${API_URL}/`,{
            headers:{
                Authorization:accessToken,
            }
        });
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service get all order ")
        throw error.response.data;
    }
}
const updateStatus=async(orderId:string,accessToken:string)=>{
    try {
        const response = await axios.post(`${API_URL}/changeStatus`,{
           
                orderId}
            ,
            {

                headers:{
                    Authorization:accessToken,
                }
            }
        );
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service update status ")
        throw error.response.data;
    }
}
const cancelOrder=async(orderId:string,accessToken:string)=>{
    try {
        const response = await axios.post(`${API_URL}/cancelOrder`,
            {orderId},{

                headers:{
                    Authorization:accessToken,
                }
            }
        );
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service cancel order")
        throw error.response.data;
    }
}
export const orderService= {
    getUserOrders,
    updateStatus,
    cancelOrder,
}