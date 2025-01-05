import useAxiosService from "./axiosService";

const axios = useAxiosService();
const getInfor = async () => {
  try {
    const response = await axios.get("/user/profile");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Unknown error occurred" };
  }
};

const updateInfor = async (data: any) => {
  try {
    const response = await axios.post("/user/profile/update-infor", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Unknown error occurred" };
  }
};
const updatePassword = async (data: any) => {
  try {
    const response = await axios.put("/user/profile/update-password", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Unknown error occurred" };
  }
};
const getCoupon = async () => {
  try {
    const response = await axios.get("/user/profile/coupon");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Unknown error occurred" };
  }
};

export const userService = {
  getInfor,
  updateInfor,
  updatePassword,
  getCoupon,
};
