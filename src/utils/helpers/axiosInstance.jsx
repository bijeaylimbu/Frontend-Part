import axios from "axios";
const basePath="https://localhost:7227/api";
const axiosInstance=axios.create({
    baseURL:basePath
});
export default axiosInstance;