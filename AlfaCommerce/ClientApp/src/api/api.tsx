import axios, {AxiosResponse, Method} from "axios";

const api = axios.create({
    baseURL: process.env.PUBLIC_URL + "/api/v1"
})

export default function <T>(url: string, method: Method, args: any, data: any): Promise<AxiosResponse<T>> {
    return api.request<T>({
        url, method, params: args, data
    })
}