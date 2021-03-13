import api from './api'
import {AxiosResponse} from "axios";
import {Product} from "./models";

export interface NewProductRequest {
    product: {
        name: string,
        price: number,
        colorId: number,
        weight: number,
    }
    categories: number[],
    images: string[]
}

export default class Colors {
    static get(): Promise<AxiosResponse<Product[]>> {
        return api<Product[]>('products', 'get', {}, {})
    }

    static details(id: number): Promise<AxiosResponse<Product>> {
        return api<Product>('products/' + id, 'get', {}, {})
    }

    static add(product: NewProductRequest): Promise<AxiosResponse> {
        return api<any>('products', 'post', {}, product)
    }

    static delete(id: number): Promise<AxiosResponse> {
        return api<any>('products/' + id, 'delete', {}, {})
    }
}