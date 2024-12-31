import useAxiosService from "./axiosService";

const axios=useAxiosService()

const getAll=async()=>{
    try {
        const response = await axios.get(`api/category`);
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service get all categories")
        throw error.response.data;
    }
}
export const categoryService= {
    getAll,
}