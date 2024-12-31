import axios from 'axios';
import useAuthStore from '../store/authStore';
const url ="http://192.168.1.7:3000/"

const useAxiosService = () => {
  const axiosInstance = axios.create({
    baseURL:url,
  });
  // Thêm request interceptor với accessToken từ AsyncStorage
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const {accessToken} = useAuthStore.getState()
        //const accessToken = await AsyncStorage.getItem('authToken'); // Lấy token từ AsyncStorage //chi lay dc khi isremember
        //console.log('token lay duoc:',accessToken)
        if (accessToken) {
          config.headers.Authorization = accessToken;
        }
      } catch (error) {
        console.error("Error fetching token from Storage:", error);
        // chuyen ve login
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Thêm response interceptor với logic điều hướng
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response?.status === 401) {
        console.log('Unauthorized - redirecting to login'); // Xử lý khi token hết hạn
        // Thêm logic điều hướng ở đây nếu cần
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosService;