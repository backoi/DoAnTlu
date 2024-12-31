import useAxiosService from "./axiosService";
//http://192.168.1.10:3000/device/register
const axios=useAxiosService()
const registerDevice=async(token:any)=>{
    try {
        //console.log('token nhan duoc',token)
        const response = await axios.post(`device/register`, {token});
        return response.data;
    } catch (error: any) {
        //console.error("Error in registerDevice:", error.message);
        throw error.response?.data || { message: 'Unknown error occurred' };
    }
}
const deleleDevice=async()=>{
    try {
        const response = await axios.delete('device/delete');
        return response.data;
    } catch (error: any) {
        //console.error("Error in deleleDevice:", error.message);
        throw error.response?.data || { message: 'Unknown error occurred' };
    }
}
export const deviceService = {
    registerDevice,
    deleleDevice,
};