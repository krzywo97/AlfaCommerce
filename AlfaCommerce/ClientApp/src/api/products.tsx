import api from './api'
import {AxiosResponse} from 'axios'
import {Product} from './models'

export interface NewProductRequest {
    product: {
        name: string,
        price: number,
        colorId: number,
        weight: number,
    }
    categories: number[],
    photos: string[]
}

export interface EditProductRequest {
    id: number,
    name: string,
    price: number,
    colorId: number,
    weight: number,
    categories: number[],
    photos: string[]
}

export interface Filters {
    category?: number,
    color?: number,
    minPrice?: number | string,
    maxPrice?: number | string,
    minWeight?: number | string,
    maxWeight?: number | string,
    name?: string
}

export default {
    get(filters?: Filters): Promise<AxiosResponse<Product[]>> {
        return api<Product[]>('products', 'get', filters, {})
    },
    details(id: number): Promise<AxiosResponse<Product>> {
        return api<Product>('products/' + id, 'get', {}, {})
    },
    add(product: NewProductRequest): Promise<AxiosResponse> {
        return api<any>('products', 'post', {}, product)
    },
    delete(id: number): Promise<AxiosResponse> {
        return api<any>('products/' + id, 'delete', {}, {})
    }
}