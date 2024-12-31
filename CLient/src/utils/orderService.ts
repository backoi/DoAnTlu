
import useAxiosService from "./axiosService";

const axios=useAxiosService()
const getUserOrders=async()=>{
    try {
        const response = await axios.get(`user/order/`);
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service get all order ")
        throw error.response.data;
    }
}
const updateStatus=async(orderId:string)=>{
    try {
        const response = await axios.post(`user/order/changeStatus`,{
           
                orderId}
            ,
        );
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service update status ")
        throw error.response.data;
    }
}
const cancelOrder=async(orderId:string,accessToken:string)=>{
    try {
        const response = await axios.post(`user/order/cancelOrder`,
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