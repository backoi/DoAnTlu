import axios from 'axios';

const API_URL = 'http://192.168.1.14:3000/payment/';

const createPayment=async(items:any,paymentMethod:any,totalItems:any)=>{
    try {
        const response = await axios.post(`${API_URL}/create-payment-intent`,{
            items,paymentMethod,totalItems
        });
        return response.data;
    } catch (error:any) {
        console.log("Lỗi bên service payment")
        throw error.response.data;
    }
}
export const paymentService= {
    createPayment,
}