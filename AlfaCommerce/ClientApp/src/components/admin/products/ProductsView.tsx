import React from 'react'
import {Category, Color, Product} from '../../../api/models'
import FiltersView from '../widgets/FiltersView'
import {default as CategoriesApi} from '../../../api/categories'
import {default as ColorsApi} from '../../../api/colors'
import {default as ProductsApi, Filters} from '../../../api/products'
import ProductTile from '../../widgets/ProductTile'
import {Link} from 'react-router-dom'
import Pagination from '../../widgets/Pagination'

interface State {
    filters: Filters,
    products: Product[],
    categories: Category[],
    colors: Color[],
    loadingProducts: boolean,
    loadingCategories: boolean,
    loadingColors: boolean,
    currentPage: number,
    totalPages: number,
    totalProducts: number
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
        loadingProducts: true,
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0
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
                        <FiltersView onFiltersChanged={this.handleFiltersChange} onApplyFilters={this.fetchProducts}
                                     categories={this.state.categories} colors={this.state.colors}/>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-body'>
                        <div className='d-flex flex-row justify-content-between pe-2'>
                            <h5 className='card-title'>Znalezione produkty ({this.state.totalProducts})</h5>
                            <Link to='/admin/products/new' className='text-underline-hover'>Nowy produkt</Link>
                        </div>
                        <div className='d-flex flex-row flex-wrap'>
                            {this.state.products.map(p => (
                                <ProductTile key={p.id} name={p.name} imageUrl={p.photos[0].url}
                                             url={`products/${p.id}`} className='col-6 col-md-4 col-lg-3 col-xl-2 p-1'/>
                            ))}
                            {this.state.totalProducts == 0 ? (
                                <div className='alert alert-info mt-2'>Nie znaleziono produktów spełniających kryteria
                                    wyszukiwania</div>
                            ) : (
                                <div className='col-12 d-flex justify-content-center mt-2'>
                                    <Pagination currentPage={this.state.currentPage} totalPages={this.state.totalPages}
                                                onPageChanged={this.changePage}/>
                                </div>
                            )}
                        </div>
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
                [name]: value
            }
        })
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

    changePage = (page: number): void => {
        this.setState({
            currentPage: page
        }, () => this.fetchProducts())
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
        ProductsApi.get(this.state.filters, this.state.currentPage, 24)
            .then(results => {
                this.setState({
                    loadingProducts: false,
                    products: results.data.products,
                    totalPages: results.data.totalPages,
                    totalProducts: results.data.totalProducts
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