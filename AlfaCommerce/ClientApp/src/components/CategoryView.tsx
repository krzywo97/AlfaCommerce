import React from 'react'
import {Category, Color, Product} from '../api/models'
import {default as CategoriesApi} from '../api/categories'
import {default as ColorsApi} from '../api/colors'
import {default as ProductsApi} from '../api/products'
import FiltersView from './widgets/FiltersView'
import {Filters} from '../api/products'
import ProductTile from './widgets/ProductTile'
import Pagination from './widgets/Pagination'

interface Props {
    id: number
}

interface State {
    category: Category,
    colors: Color[],
    filters: Filters,
    products: Product[],
    currentPage: number,
    totalPages: number,
    totalProducts: number,
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
            category: this.props.id
        },
        loadingProducts: true,
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0
    }

    componentDidMount() {
        this.fetchCategory()
        this.fetchColors()
        this.fetchProducts()
    }

    render() {
        return (
            <div className='d-flex flex-column flex-md-row'>
                <div className='col-12 col-md-4 col-lg-3'>
                    <FiltersView colors={this.state.colors} filters={this.state.filters}
                                 onFiltersChanged={this.handleFiltersChange} onApplyFilters={this.fetchProducts}
                                 onResetFilters={this.resetFilters}/>
                </div>
                <div className='col ms-0 ms-md-3 mt-3 mt-md-0'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Produkty w kategorii {this.state.category.name} {
                                this.state.totalProducts > 0 ? ` (${this.state.totalProducts})` : ''
                            }</h5>
                            <div className='d-flex flex-row flex-wrap'>
                                {this.state.products.map(p => (
                                    <ProductTile key={p.id} name={p.name} imageUrl={p.photos[0].url}
                                                 url={`/products/${p.id}`}
                                                 className='col-6 col-lg-4 col-xl-3 p-1'/>
                                ))}
                                {this.state.products.length === 0 ? (
                                    <div className='alert alert-info mt-2'>Nie znaleziono produktów spełniających
                                        kryteria wyszukiwania</div>
                                ) : (
                                    <div className='col-12 d-flex justify-content-center mt-2'>
                                        <Pagination currentPage={this.state.currentPage}
                                                    totalPages={this.state.totalPages}
                                                    onPageChanged={this.changePage}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

    private changePage = (page: number): void => {
        this.setState({
            currentPage: page
        }, () => this.fetchProducts())
    }

    private resetFilters = (): void => {
        // We need to pass an object with all the fields set, or input boxes will retain their values
        this.setState({
            filters: {
                category: this.props.id,
                color: 0,
                minPrice: '',
                maxPrice: '',
                minWeight: '',
                maxWeight: '',
                name: ''
            }
        }, () => {
            this.fetchProducts()
        })
    }

    private fetchProducts = (): void => {
        ProductsApi.get(this.state.filters, this.state.currentPage, 36)
            .then(response => {
                this.setState({
                    products: response.data.products,
                    totalPages: response.data.totalPages,
                    totalProducts: response.data.totalProducts,
                    loadingProducts: false
                })
            }, () => {

            })
            .catch(() => {

            })
    }
}