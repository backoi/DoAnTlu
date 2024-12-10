import axios from "axios";
import { IP_ADDRESS } from '.';

const API_URL = `http://${IP_ADDRESS}:3000/payment/`;

const createPayment = async (totalAmount: any, accessToken: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/create-payment-intent`,
      { totalAmount },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log("Lỗi bên service payment create");
    throw error.response.data;
  }
};

const confirmPayment = async (
  items: any,
  deliveryAddress:string,accessToken: string,
  coupon?:string,
  orderId?: string,
  paymentMethod?: string,
) => {
  try {
    const response = await axios.post(
      `${API_URL}/confirm-payment`,
      {
        items,
        orderId,
        paymentMethod,
        deliveryAddress,coupon
      },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.log("Lỗi bên service payment confirm");
    throw error.response.data;
  }
};

const validateCoupon = async(couponCode: string,accessToken:string)=>{
  try {
    const response = await axios.post(
      `${API_URL}/validate-coupon`,
      { couponCode },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.log("L��i bên service validate coupon");
    throw error.response.data;
  }
}

export const paymentService = {
  createPayment,
  confirmPayment,
  validateCoupon,
};
