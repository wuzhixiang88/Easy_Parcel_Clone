import axios from "axios";

const axiosRefreshToken = axios.create({
    withCredentials: true
})

axiosRefreshToken.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        if (error.response.status === 401 && originalRequest.url === "http://localhost:3000/api/users/token") {
            return Promise.reject(error)
        }
        if (error.response && !originalRequest._retry) {
            console.log(error.response.data)
            originalRequest._retry = true
            await axiosRefreshToken.post("/api/users/token");
            return axiosRefreshToken(originalRequest)
        }
        return Promise.reject(error);
    }
)

export default axiosRefreshToken;