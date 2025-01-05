import useAxiosService from "./axiosService";

const axios=useAxiosService()

const getAll=async()=>{
    try {
        const response = await axios.get(`api/product/`);
        return response.data
    } catch (error:any) {
        throw error.response.data;
    }
}
const getProductWithID= async(id:any)=>{
    try {
        const response = await axios.get(`api/product/${id}`);
        return response.data
    } catch (error:any) {
        throw error.response.data;
    }
}

const getProducts=async(search='',category='',minPrice?:number,maxPrice?:number,minRate?:number,offset=0,limit=10)=>{
    try {
        const response = await axios.get(`api/product/`,{
            params:{
                search,
                category,
                minPrice,
                maxPrice,
                minRate,
                offset,
                limit
            }
        });
        return response.data
    } catch (error:any) {
        throw error.response.data;
    }
}
const getBestSeller= async()=>{
    try {
        const response = await axios.get(`analytic/top-selling-products`);
        return response.data
    } catch (error:any) {
        throw error.response.data;
    }
}
export const productService= {
    getAll,
    getProducts,
    getBestSeller,
    getProductWithID,
}