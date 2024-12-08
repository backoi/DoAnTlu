import axios from "axios";

const API_URL = "http://192.168.1.14:3000/payment/";

const createPayment = async (items: any, accessToken: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/create-payment-intent`,
      { items },
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
  accessToken: string,
  items: any,
  deliveryAddress:string,
  orderId?: string,
  paymentMethod?: string,
) => {
  try {
    const response = await axios.post(
      `${API_URL}/confirm-payment`,
      {
        items,
        orderId,
        paymentMethod,deliveryAddress
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

export const paymentService = {
  createPayment,
  confirmPayment,
};
