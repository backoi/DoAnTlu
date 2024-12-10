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
    } catch (error) {
        
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
    } catch (error) {
        
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
    } catch (error) {
        
    }
}
export const orderService= {
    getUserOrders,
    updateStatus,
    cancelOrder,
}