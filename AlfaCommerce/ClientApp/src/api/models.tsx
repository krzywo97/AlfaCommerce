export interface Category {
    id: number,
    name: string,
    products?: Product[],
    parent?: Category | number | undefined | null
}

export interface Color {
    id: number,
    name: string
}

export interface Photo {
    url: string
}

export interface Product {
    id: number,
    name: string,
    price: number,
    color: Color,
    weight: number,
    photos: Photo[],
    categories: Category[]
}