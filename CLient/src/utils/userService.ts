

import useAxiosService from "./axiosService";

const axios=useAxiosService()
// Get user information
const getInfor = async () => {
  try {
    const response = await axios.get('/user/profile');
    return response.data;
  } catch (error: any) {
    //console.error("Error in getInfor:", error.message);
    throw error.response?.data || { message: 'Unknown error occurred' };
  }
};

// Update user information
const updateInfor = async (data: any) => {
  try {
    const response = await axios.post('/user/profile/update-infor', data);
    return response.data;
  } catch (error: any) {
    //console.error("Error in updateInfor:", error.message);
    throw error.response?.data || { message: 'Unknown error occurred' };
  }
};
//update password
const updatePassword = async (data: any) => {
  try {
    const response = await axios.put('/user/profile/update-password', data);
    return response.data;
  } catch (error: any) {
    //console.error("Error in updatePassword:", error.message);
    throw error.response?.data || { message: 'Unknown error occurred' };
  }
};
const getCoupon= async () =>{
    try {
        const response = await axios.get('/user/profile/coupon');
        return response.data;
    } catch (error: any) {
        //console.error("Error in getCoupon:", error.message);
        throw error.response?.data || { message: 'Unknown error occurred' };
    }
}

export const userService = {
  getInfor,
  updateInfor,
  updatePassword,
  getCoupon,
};

// import axios from 'axios';
// import { IP_ADDRESS } from '.';
// const API_URL = `http://${IP_ADDRESS}:3000/user/profile`;

// const getInfor=async(accessToken:any)=>{
//     try {
//         const response = await axios.get(`${API_URL}/`,{
//             headers:{
//                 Authorization:accessToken,
//             }
//         });
//         return response.data
//     } catch (error:any) {
//         console.log("Lỗi bên service get infor")
//         throw error.response.data;
//     }
// }
// const updateInfor=async(accessToken:any,data:any)=>{
//     try {
//         const response = await axios.post(`${API_URL}/update-infor`,data,{
//             headers:{
//                 Authorization:accessToken,
//             }
//         });
//         return response.data
//     } catch (error:any) {
//         console.log("Lỗi bên service update infor")
//         throw error.response.data;
//     }
// }
// export const userService= {
//     getInfor,updateInfor
// }

