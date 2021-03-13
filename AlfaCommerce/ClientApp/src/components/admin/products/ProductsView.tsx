import React from "react";
import {Category, Color, Product} from "../../../api/models";
import FiltersView from './FiltersView'
import {default as CategoriesApi} from '../../../api/categories'
import {default as ColorsApi} from '../../../api/colors'
import {default as ProductsApi} from '../../../api/products'
import ProductTile from "../widgets/ProductTile";

interface Filters {
    category: number,
    color: number,
    minPrice?: number,
    maxPrice?: number,
    minWeight?: number,
    maxWeight?: number,
    name?: string
}

interface State {
    filters: Filters,
    products: Product[],
    categories: Category[],
    colors: Color[],
    loadingProducts: boolean,
    loadingCategories: boolean,
    loadingColors: boolean
}

export default class ProductsView extends React.PureComponent<{}, State> {
    state: State = {
        filters: {
            name: '',
            minPrice: undefined,
            maxPrice: undefined,
            minWeight: undefined,
            maxWeight: undefined,
            color: 0,
            category: 0
        },
        products: [],
        categories: [],
        colors: [],
        loadingCategories: true,
        loadingColors: true,
        loadingProducts: true
    }

    componentDidMount() {
        this.fetchCategories()
        this.fetchColors()
        this.fetchProducts()
    }

    render() {
        return (
            <div>
                <div className='card mb-3'>
                    <div className='card-body'>
                        <h5 className='card-title mb-3'>Produkty</h5>
                        <FiltersView onFiltersChanged={this.handleFiltersChange} onApplyFilters={this.applyFilters}
                                     categories={this.state.categories} colors={this.state.colors}/>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-body d-flex flex-row'>
                        {this.state.products.map(p => (
                            <ProductTile key={p.id} name={p.name} imageUrl={p.photos[0].url} url={`products/${p.id}`}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    handleFiltersChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement): void => {
        let name = target.name
        let value = target.value

        this.setState({
            filters: {
                ...this.state.filters,
                [name]: value,
            }
        })
    }

    applyFilters = (): void => {

    }

    fetchCategories = (): void => {
        CategoriesApi.get()
            .then(results => {
                this.setState({
                    loadingCategories: false,
                    categories: results.data
                })
            }, () => {
                this.setState({
                    loadingCategories: false
                })
            })
            .catch(() => {
                this.setState({
                    loadingCategories: false
                })
            })
    }

    fetchColors = (): void => {
        ColorsApi.get()
            .then(results => {
                this.setState({
                    loadingColors: false,
                    colors: results.data
                })
            }, () => {
                this.setState({
                    loadingColors: false
                })
            })
            .catch(() => {
                this.setState({
                    loadingColors: false
                })
            })
    }

    fetchProducts = (): void => {
        ProductsApi.get()
            .then(results => {
                this.setState({
                    loadingProducts: false,
                    products: results.data
                })
            }, () => {
                this.setState({
                    loadingProducts: false
                })
            })
            .catch(() => {
                this.setState({
                    loadingProducts: false
                })
            })
    }
}