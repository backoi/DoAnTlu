import useAxiosService from "./axiosService";

const axios = useAxiosService();
const getReviewById = async (productId: string) => {
  try {
    const response = await axios.get(`api/review/${productId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
const createReview = async (
  productId: string,
  rating: number,
  comment: string
) => {
  try {
    const response = await axios.post(`api/review/${productId}/reviews`, {
      rating,
      comment,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const reviewService = {
  getReviewById,
  createReview,
};
