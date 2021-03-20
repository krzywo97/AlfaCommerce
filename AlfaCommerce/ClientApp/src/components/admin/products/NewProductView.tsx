import React from 'react'
import {NewProductRequest} from '../../../api/products'
import {default as ProductsApi} from '../../../api/products'
import {default as CategoriesApi} from '../../../api/categories'
import {default as ColorsApi} from '../../../api/colors'
import {Category, Color} from '../../../api/models'
import './NewProductView.css'
import {Route} from 'react-router'
import {History} from 'history'

interface State {
    product: NewProductRequest,
    colors: Color[],
    categories: Category[],
    loadingColors: boolean,
    loadingCategories: boolean
}

export default class NewProductView extends React.PureComponent<{}, State> {
    state: State = {
        product: {
            product: {
                name: '',
                price: 0,
                weight: 0,
                colorId: 0
            },
            categories: [],
            photos: ['', '', '']
        },
        colors: [],
        categories: [],
        loadingColors: true,
        loadingCategories: true
    }

    componentDidMount() {
        this.fetchColors()
        this.fetchCategories()
    }

    render() {
        let imageRows = []
        for (let i = 0; i < 3; i++) {
            let id = `photo${i + 1}`
            imageRows[i] = (
                <div className='row mb-3' key={i}>
                    <div className='col-12 col-md-3 col-form-label'>
                        <label htmlFor={id}>Zdjęcie {i + 1}</label>
                    </div>
                    <div className='col col-md-5'>
                        <input type='text' className='form-control' id={id} name={id}
                               value={this.state.product.photos[i]}
                               onChange={e => this.handlePhotoChange(i, e.target.value)}/>
                    </div>
                </div>
            )
        }

        return (
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title mb-3'>Nowy produkt</h5>
                    <div className='row mb-3'>
                        <div className='col-12 col-md-3 col-form-label'>
                            <label htmlFor='name'>Nazwa</label>
                        </div>
                        <div className='col col-md-5'>
                            <input type='text' className='form-control' id='name' name='name'
                                   value={this.state.product.product.name}
                                   onChange={e => this.handleProductChange(e.target)}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-12 col-md-3 col-form-label'>
                            <label htmlFor='price'>Cena</label>
                        </div>
                        <div className='col col-md-5'>
                            <input type='number' step={0.01} className='form-control' id='price' name='price'
                                   value={this.state.product.product.price}
                                   onChange={e => this.handleProductChange(e.target)}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-12 col-md-3 col-form-label'>
                            <label htmlFor='weight'>Masa</label>
                        </div>
                        <div className='col col-md-5'>
                            <input type='number' step={1} className='form-control' id='weight' name='weight'
                                   value={this.state.product.product.weight}
                                   onChange={e => this.handleProductChange(e.target)}/>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-12 col-md-3 col-form-label'>
                            <label htmlFor='color'>Kolor</label>
                        </div>
                        <div className='col col-md-5'>
                            <select id='color' className='form-select'
                                    name='colorId'
                                    onChange={e => this.handleProductChange(e.target)}>
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
                            <select id='category' className='form-select' name='colorId'
                                    onChange={e => this.handleCategoryChange(parseInt(e.target.value))}>
                                {this.state.categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {imageRows}
                    <div className='row'>
                        {this.state.product.photos.map((p, i) => (
                            p.length > 0 ? (
                                <div className='col-3 mb-2' key={i}>
                                    <img src={p} alt='Podgląd zdjęcia' className='scaled-image'/>
                                </div>
                            ) : ''
                        ))}
                    </div>
                    <div className='row'>
                        <Route render={({history: History}) => (
                            <div className='d-flex flex-row-reverse col col-lg-8'>
                                <button className='btn btn-primary' onClick={e => this.saveProduct(History)}>Zapisz
                                </button>
                            </div>
                        )}/>
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
                    categories: response.data,
                    product: {
                        ...this.state.product,
                        categories: [response.data[0].id]
                    }
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
                    colors: response.data,
                    product: {
                        ...this.state.product,
                        product: {
                            ...this.state.product.product,
                            colorId: response.data[0].id
                        }
                    }
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

    handleProductChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement): void => {
        let name = target.name
        let value = target.value

        this.setState({
            product: {
                ...this.state.product,
                product: {
                    ...this.state.product.product,
                    [name]: value
                }
            }
        })
    }

    handleCategoryChange = (categoryId: number): void => {
        this.setState({
            product: {
                ...this.state.product,
                categories: [categoryId]
            }
        })
    }

    handlePhotoChange = (id: number, url: string): void => {
        let urls = this.state.product.photos
        urls[id] = url

        this.setState({
            product: {
                ...this.state.product,
                photos: urls
            }
        })
    }

    saveProduct = (history: History): void => {
        ProductsApi.add(this.state.product)
            .then(() => {
                history.push('/admin/products')
            }, () => {

            })
            .catch(() => {

            })
    }
}