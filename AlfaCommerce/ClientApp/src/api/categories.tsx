import api from './api'
import {Category} from './models'
import {AxiosResponse} from 'axios'

export interface NewCategoryRequest {
    name: string,
    parentId?: number
}

export default {
    get(): Promise<AxiosResponse<Category[]>> {
        return api<Category[]>('categories', 'get', {}, {})
    },
    details(id: number): Promise<AxiosResponse<Category>> {
        return api<Category>('categories/' + id, 'get', {}, {})
    },
    add(category: NewCategoryRequest): Promise<AxiosResponse> {
        return api<any>('categories', 'post', {}, category)
    },
    edit(category: Category): Promise<AxiosResponse> {
        return api<any>('categories', 'put', {}, category)
    },
    delete(id: number): Promise<AxiosResponse> {
        return api<any>('categories/' + id, 'delete', {}, {})
    }
}