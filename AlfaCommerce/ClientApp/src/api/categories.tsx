import api from "./api";
import {Category} from "../types/categories.interface";
import {AxiosResponse} from "axios";

export default class Categories {
    static get(): Promise<AxiosResponse<Array<Category>>> {
        return api<Array<Category>>('categories', 'get', {})
    }
}