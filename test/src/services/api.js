import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const original = err.config

        if(original.url.includes("/auth/refresh")){
            return Promise.reject(err)
        }
        if(err.response?.status === 401 && !original._retry){
            original._retry= true
            try {
                const res = await axios.post(
                    "/api/auth/refresh",
                    {},
                    {withCredentials: true}
                )
                const newToken = res.data.accessToken
                localStorage.setItem("accessToken",newToken)
                original.headers.Authorization = `Bearer ${newToken}`
                return api(original)
            } catch (error) {
                localStorage.removeItem("accessToken")
                window.location.href = "/login"
                return Promise.reject(e)
            }
        }
        return Promise.reject(err)
    }
)
export default api