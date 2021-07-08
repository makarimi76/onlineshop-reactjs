import axios from "axios"

const baseURL = process.env.REACT_APP_BACKEND_URL

console.log(baseURL)
const axiosInstance = axios.create({
    baseURL: baseURL
})

export default axiosInstance