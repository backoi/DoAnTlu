import useAxiosService from "./axiosService";

const axios=useAxiosService()
const getReviewById=async(productId:string)=>{
    try {
        const response = await axios.get(`api/review/${productId}`);
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service review id")
        throw error.response.data;
    }
}
const createReview=async(productId:string,rating:number,comment:string)=>{
    try {
        const response = await axios.post(`api/review/${productId}/reviews`,{
                rating,
                comment
            },
        );
        return response.data
    } catch (error:any) {
        console.log("Lỗi bên service create review")
        throw error.response.data;
    }
}

export const reviewService= {
    getReviewById,
    createReview,
}