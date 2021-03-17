import api from './api'
import {AxiosResponse} from 'axios'
import {Color} from './models'

export interface NewColorRequest {
    name: string
}

export default class Colors {
    static get(): Promise<AxiosResponse<Color[]>> {
        return api<Color[]>('colors', 'get', {}, {})
    }

    static details(id: number): Promise<AxiosResponse<Color>> {
        return api<Color>('colors/' + id, 'get', {}, {})
    }

    static add(color: NewColorRequest): Promise<AxiosResponse> {
        return api<any>('colors', 'post', {}, color)
    }

    static delete(id: number): Promise<AxiosResponse> {
        return api<any>('colors/' + id, 'delete', {}, {})
    }
}