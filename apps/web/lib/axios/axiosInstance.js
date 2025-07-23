import axios from "axios";
import { cookies } from "next/headers";
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HTTP_URL,
    withCredentials: true,
});
axiosInstance.interceptors.request.use(async (config) => {
    let token;
    if (typeof window === "undefined") {
        const cookieStore = await cookies();
        token = cookieStore.get("jwt")?.value;
    }
    else {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2)
                return parts.pop()?.split(";").shift();
        };
        token = getCookie("jwt");
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default axiosInstance;
