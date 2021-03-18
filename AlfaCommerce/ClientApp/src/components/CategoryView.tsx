import React from 'react'
import Layout from './Layout'
import {Category, Color, Product} from '../api/models'
import {default as CategoriesApi} from '../api/categories'
import {default as ColorsApi} from '../api/colors'
import {default as ProductsApi} from '../api/products'
import FiltersView from './widgets/FiltersView'
import {Filters} from '../api/products'
import ProductTile from './widgets/ProductTile'

interface Props {
    id: number
}

interface State {
    category: Category,
    colors: Color[],
    filters: Filters,
    products: Product[],
    loadingColors: boolean,
    loadingProducts: boolean,
    loadingCategory: boolean
}

export default class CategoryView extends React.PureComponent<Props, State> {
    state: State = {
        category: {
            id: 0,
            name: '',
            products: [],
            parent: null
        },
        loadingCategory: true,
        colors: [],
        products: [],
        loadingColors: true,
        filters: {
            category: this.props.id,
            color: 0
        },
        loadingProducts: true
    }

    componentDidMount() {
        this.fetchCategory()
        this.fetchColors()
        this.fetchProducts()
    }

    render() {
        return (
            <Layout fluid={false}>
                <div className='d-flex flex-row'>
                    <div className='col-3'>
                        <FiltersView colors={this.state.colors} filters={this.state.filters}
                                     onFiltersChanged={this.handleFiltersChange} onApplyFilters={this.fetchProducts}
                                     onResetFilters={this.resetFilters}/>
                    </div>
                    <div className='col ms-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Produkty w kategorii {this.state.category.name} {
                                    this.state.products.length > 0 ? ` (${this.state.products.length})` : ''
                                }</h5>
                                <div className='d-flex flex-row flex-wrap'>
                                    {this.state.products.map(p => (
                                        <ProductTile key={p.id} name={p.name} imageUrl={p.photos[0].url}
                                                     url={`/products/${p.id}`}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

    private fetchColors = (): void => {
        ColorsApi.get()
            .then(response => {
                this.setState({
                    loadingColors: false,
                    colors: response.data
                })
            }, () => {

            })
            .catch(() => {

            })
    }

    private fetchCategory = (): void => {
        CategoriesApi.details(this.props.id)
            .then(response => {
                this.setState({
                    loadingCategory: false,
                    category: response.data
                })
            }, () => {

            })
            .catch(() => {

            })
    }

    private handleFiltersChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement): void => {
        let name = target.name
        let value = target.value

        this.setState({
            filters: {
                ...this.state.filters,
                [name]: value
            }
        })
    }

    private resetFilters = (): void => {
        this.setState({
            filters: {
                category: this.props.id,
                color: 0,
                name: '',
                minPrice: '',
                maxPrice: '',
                minWeight: '',
                maxWeight: ''
            }
        })
        this.fetchProducts()
    }

    private fetchProducts = (): void => {
        ProductsApi.get(this.state.filters)
            .then(response => {
                this.setState({
                    products: response.data,
                    loadingProducts: false
                })
            }, () => {

            })
            .catch(() => {

            })
    }
}