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

export interface ProductsListResponse {
    totalPages: number,
    totalProducts: number,
    products: Product[]
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
    get(filters?: Filters, page: number = 1, perPage: number = 40): Promise<AxiosResponse<ProductsListResponse>> {
        return api<ProductsListResponse>('products', 'get', {...filters, page, perPage}, {})
    },
    details(id: number): Promise<AxiosResponse<Product>> {
        return api<Product>('products/' + id, 'get', {}, {})
    },
    add(product: NewProductRequest): Promise<AxiosResponse> {
        return api<any>('products', 'post', {}, product)
    },
    edit(product: EditProductRequest): Promise<AxiosResponse> {
        return api<any>('products', 'put', {}, product)
    },
    delete(id: number): Promise<AxiosResponse> {
        return api<any>('products/' + id, 'delete', {}, {})
    }
}