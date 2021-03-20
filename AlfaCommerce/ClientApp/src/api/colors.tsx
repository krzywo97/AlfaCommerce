import api from './api'
import {AxiosResponse} from 'axios'
import {Color} from './models'

export interface NewColorRequest {
    name: string
}

export default {
    get(): Promise<AxiosResponse<Color[]>> {
        return api<Color[]>('colors', 'get', {}, {})
    },
    details(id: number): Promise<AxiosResponse<Color>> {
        return api<Color>('colors/' + id, 'get', {}, {})
    },
    add(color: NewColorRequest): Promise<AxiosResponse> {
        return api<any>('colors', 'post', {}, color)
    },
    delete(id: number): Promise<AxiosResponse> {
        return api<any>('colors/' + id, 'delete', {}, {})
    }
}