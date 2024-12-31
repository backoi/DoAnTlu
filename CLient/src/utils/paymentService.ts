
import useAxiosService from "./axiosService";

const axios=useAxiosService()
const createPayment = async (totalAmount: any, accessToken: string) => {
  try {
    const response = await axios.post(
      `payment/create-payment-intent`,
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
      `payment//confirm-payment`,
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
      `payment/validate-coupon`,
      { couponCode },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.log("Loi bên service payment validate coupon");
    throw error.response.data;
  }
}

export const paymentService = {
  createPayment,
  confirmPayment,
  validateCoupon,
};
