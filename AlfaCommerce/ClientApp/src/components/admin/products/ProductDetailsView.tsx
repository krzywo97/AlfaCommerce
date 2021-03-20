import React from 'react'
import {Category, Color, Product} from '../../../api/models'
import {default as CategoriesApi} from '../../../api/categories'
import {default as ColorsApi} from '../../../api/colors'
import {default as ProductsApi, EditProductRequest} from '../../../api/products'
import {History} from 'history'
import {Route} from 'react-router'

export interface Props {
    id: number
}

interface State {
    product: Product,
    newProduct: EditProductRequest,
    loadingDetails: boolean,
    colors: Color[],
    loadingColors: boolean,
    categories: Category[],
    loadingCategories: boolean
}

export default class ProductDetailsView extends React.PureComponent<Props, State> {
    state: State = {
        product: {
            id: this.props.id,
            name: '',
            price: 0,
            color: {
                id: 0,
                name: ''
            },
            weight: 0,
            photos: [],
            categories: []
        },
        newProduct: {
            id: this.props.id,
            name: '',
            price: 0,
            colorId: 0,
            weight: 0,
            photos: [],
            categories: []
        },
        loadingDetails: true,
        colors: [],
        loadingColors: true,
        categories: [],
        loadingCategories: true
    }

    componentDidMount() {
        this.fetchCategories()
        this.fetchColors()
        this.fetchDetails()
    }

    render() {
        return (
            <div>
                <div className='card'>
                    <div className='card-body'>
                        <h5>{this.state.product.name}</h5>
                        <div className='row mb-3'>
                            <div className='col-12 col-md-3 col-form-label'>
                                <label htmlFor='id'>Identyfikator</label>
                            </div>
                            <div className='col col-md-5'>
                                <input type='text' id='id' className='form-control' readOnly={true}
                                       value={this.props.id}/>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-12 col-md-3 col-form-label'>
                                <label htmlFor='name'>Nazwa</label>
                            </div>
                            <div className='col col-md-5'>
                                <input type='text' id='name' className='form-control'
                                       name='name' value={this.state.newProduct.name}
                                       onChange={e => this.handleInputChange(e.target)}/>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-12 col-md-3 col-form-label'>
                                <label htmlFor='price'>Cena</label>
                            </div>
                            <div className='col col-md-5'>
                                <input type='number' step='0.01' id='price' className='form-control'
                                       name='price' value={this.state.newProduct.price}
                                       onChange={e => this.handleInputChange(e.target)}/>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-12 col-md-3 col-form-label'>
                                <label htmlFor='weight'>Masa</label>
                            </div>
                            <div className='col col-md-5'>
                                <input type='number' step='1' id='weight' className='form-control'
                                       name='weight' value={this.state.newProduct.weight}
                                       onChange={e => this.handleInputChange(e.target)}/>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-12 col-md-3 col-form-label'>
                                <label htmlFor='color'>Kolor</label>
                            </div>
                            <div className='col col-md-5'>
                                <select id='color' className='form-select'
                                        name='colorId' value={this.state.newProduct.colorId}
                                        onChange={e => this.handleInputChange(e.target)}>
                                    {this.state.colors.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-12 col-md-3 col-form-label'>
                                <label htmlFor='category'>Kategoria</label>
                            </div>
                            <div className='col col-md-5'>
                                <select id='category' className='form-select'
                                        name='categories' value={this.state.newProduct.categories[0] ?? 1}
                                        onChange={e => {
                                            let value = parseInt(e.target.value)
                                            this.setState({
                                                newProduct: {
                                                    ...this.state.newProduct,
                                                    categories: [value]
                                                }
                                            })
                                        }}>
                                    {this.state.categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <Route render={({history: History}) => (
                                <div className='d-flex flex-row-reverse col col-lg-8'>
                                    <button className='btn btn-primary'>Zapisz</button>
                                    <button className='btn btn-outline-danger me-2'
                                            onClick={e => this.deleteProduct(History)}>Usuń
                                    </button>
                                </div>
                            )}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    fetchCategories = (): void => {
        CategoriesApi.get()
            .then(response => {
                this.setState({
                    loadingCategories: false,
                    categories: response.data
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
            .then(response => {
                this.setState({
                    loadingColors: false,
                    colors: response.data
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

    fetchDetails = (): void => {
        ProductsApi.details(this.props.id)
            .then(response => {
                this.setState({
                    loadingDetails: false,
                    product: response.data,
                    newProduct: {
                        id: this.props.id,
                        name: response.data.name,
                        colorId: response.data.color.id,
                        price: response.data.price,
                        weight: response.data.weight,
                        categories: Object.assign({}, response.data.categories.map(c => c.id)),
                        photos: Object.assign({}, response.data.photos.map(p => p.url))
                    }
                })
            }, () => {
                this.setState({
                    loadingDetails: false
                })
            })
            .catch(() => {
                this.setState({
                    loadingDetails: false
                })
            })
    }

    saveChanges = (): void => {

    }

    deleteProduct = (history: History): void => {
        ProductsApi.delete(this.props.id)
            .then(() => {
                history.push('/admin/products')
            }, () => {

            })
            .catch(() => {

            })
    }

    handleInputChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement): void => {
        let name = target.name
        let value = target.value

        this.setState({
            newProduct: {
                ...this.state.newProduct,
                [name]: value
            }
        })
    }
}