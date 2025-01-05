import useAxiosService from "./axiosService";

const axios=useAxiosService()
const createPayment = async (totalAmount: any) => {
  try {
    const response = await axios.post(
      `payment/create-payment-intent`,
      { totalAmount },
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const confirmPayment = async (
  items: any,
  deliveryAddress:string,
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
    );
    
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

const validateCoupon = async(couponCode: string)=>{
  try {
    const response = await axios.post(
      `payment/validate-coupon`,
      { couponCode },
    );
    
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export const paymentService = {
  createPayment,
  confirmPayment,
  validateCoupon,
};
