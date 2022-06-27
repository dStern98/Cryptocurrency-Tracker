import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    timeout: 5000
  });


export default axiosInstance;

