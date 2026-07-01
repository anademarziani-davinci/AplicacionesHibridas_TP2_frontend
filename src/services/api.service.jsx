import axios from "axios"

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:2026"

const api = axios.create({ baseURL: baseUrl })

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.clear()
            if (window.location.pathname !== "/login") {
                window.location.href = "/login"
            }
        }
        return Promise.reject(error)
    }
)

export async function call({ uri, method = "GET", body = undefined }) {
    const response = await api.request({ url: uri, method, data: body })
    return response.data
}

export async function callUpload({ uri, method = "POST", formData }) {
    const response = await api.request({ url: uri, method, data: formData })
    return response.data
}

export default api
