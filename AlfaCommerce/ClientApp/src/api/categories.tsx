import api from './api'
import {Category} from './models'
import {AxiosResponse} from 'axios'

export interface NewCategoryRequest {
    name: string,
    parentId?: number
}

export default class Categories {
    static get(): Promise<AxiosResponse<Category[]>> {
        return api<Category[]>('categories', 'get', {}, {})
    }

    static details(id: number): Promise<AxiosResponse<Category>> {
        return api<Category>('categories/' + id, 'get', {}, {})
    }

    static add(category: NewCategoryRequest): Promise<AxiosResponse> {
        return api<any>('categories', 'post', {}, category)
    }

    static delete(id: number): Promise<AxiosResponse> {
        return api<any>('categories/' + id, 'delete', {}, {})
    }
}