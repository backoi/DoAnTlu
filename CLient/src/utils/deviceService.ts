import useAxiosService from "./axiosService";
const axios=useAxiosService()
const registerDevice=async(token:any)=>{
    try {
        const response = await axios.post(`device/register`, {token});
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Unknown error occurred' };
    }
}
const deleleDevice=async()=>{
    try {
        const response = await axios.delete('device/delete');
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { message: 'Unknown error occurred' };
    }
}
export const deviceService = {
    registerDevice,
    deleleDevice,
};