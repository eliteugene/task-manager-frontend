import axios from 'axios';

export interface Task {
    title?: string;
    description?: string;
    status?: string;
    id?: string;
    user?: string;
}

export interface LoginResponse {
    exp: number;
    message: string;
    token: string;
    user: {
        createdAt: string;
        email: string;
        id: string;
        loginAttempts: number;
        updatedAt: string;
    }
}

export const serverUrl = "http://localhost:4000"

export const fetchLogin = async () => {
    const {data} = await axios.post<LoginResponse>(`${serverUrl}/api/users/login`,{email:'nn3hl9s7@anonaddy.me', password: 'Qwer!234'})
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    axios.interceptors.request.use((config) => {
        config.headers.Authorization= `Bearer ${data.token}`
        return config
    })
    return data
}

export const fetchCreate = async (task:Task, userId:string) => {
    const { data } = await axios.post(`${serverUrl}/api/tasks`,{...task, user: userId, })
    return data
}

export const fetchRead = async () => {
    const { data } = await axios.get(`${serverUrl}/api/tasks`)
    return data
}

export const fetchUpdate = async (task:Task, userId:string) => {
    const { data } = await axios.patch(`${serverUrl}/api/tasks/${task.id}`,{...task, user: userId })
    return data;
}

export const fetchDelete = async (id: string | undefined) => {
    const { data } = await axios.delete(`${serverUrl}/api/tasks/${id}`)
    return data
}

const API = axios

export default API
