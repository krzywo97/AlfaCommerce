﻿import React from 'react'
import {default as api} from '../../../api/categories'
import {Category} from '../../../api/models'
import {Route} from 'react-router'
import {History} from 'history'
import ProductTile from '../../widgets/ProductTile'

type Props = {
    id: number
}

type State = {
    category: Category
    loading: boolean,
    newName: string
}

export default class CategoryDetailsView extends React.PureComponent<Props, State> {
    state: State = {
        category: {
            id: 0,
            name: '',
            products: []
        },
        loading: true,
        newName: ''
    }

    componentDidMount(): void {
        this.fetchDetails()
    }

    render() {
        return (
            <div>
                <div className='card'>
                    <div className='card-body bg-white'>
                        <h5 className='card-title mb-3'>{this.state.category.name}</h5>
                        <div className='row mb-3'>
                            <div className='col-12 col-md-3 col-form-label'>
                                <label htmlFor='id'>Identyfikator</label>
                            </div>
                            <div className='col col-md-5'>
                                <input type='text' id='id' className='form-control' readOnly={true}
                                       value={this.props.id}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 col-md-3 col-form-label">
                                <label htmlFor='new-name'>Nazwa</label>
                            </div>
                            <div className="col col-md-5">
                                <input type="text" id="new-name" className='form-control'
                                       onChange={this.handleNewNameChange} value={this.state.newName}/>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <Route render={({history: History}) => (
                                <div className='d-flex flex-row-reverse col col-lg-8'>
                                    <button className='btn btn-primary'
                                            onClick={() => this.saveChanges(History)}>Zapisz
                                    </button>
                                    <button className='btn btn-outline-danger me-2'
                                            onClick={() => this.deleteCategory(History)}
                                            disabled={this.state.loading || this.hasProducts()}>Usuń
                                        kategorię
                                    </button>
                                </div>)}/>
                        </div>
                        {this.hasProducts() ? (
                            <p className='text-danger mb-0'>
                                Nie można usunąć kategorii, ponieważ zawiera ona produkty
                            </p>
                        ) : ''}
                    </div>
                </div>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <h5 className='card-title mb-3'>Produkty w kategorii {
                            typeof this.state.category.products !== 'undefined' ? '(' + this.state.category.products.length + ')' : ''
                        }</h5>
                        <div className='d-flex flex-row flex-wrap'>
                            {this.state.category.products?.map(p => (
                                <ProductTile key={p.id} name={p.name} imageUrl={p.photos[0].url}
                                             url={`/admin/products/${p.id}`}
                                             className='col-6 col-md-4 col-md-3 col-xl-2 p-2'/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    fetchDetails = (): void => {
        api.details(this.props.id)
            .then(response => {
                this.setState({
                    category: response.data,
                    loading: false,
                    newName: response.data.name
                })
            }, () => {
                this.setState({
                    loading: false
                })
            })
            .catch(() => {
                this.setState({
                    loading: false
                })
            })
    }

    handleNewNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            newName: event.target.value
        })
    }

    saveChanges = (history: History): void => {
        api.edit({
            ...this.state.category,
            name: this.state.newName
        }).then(() => {
            history.push('/admin/categories')
        }, () => {

        }).catch(() => {

        })
    }

    deleteCategory = (history: History): void => {
        api.delete(this.state.category.id)
            .then(() => {
                history.push('/admin/categories')
            }, () => {

            }).catch(() => {

        })
    }

    hasProducts = (): boolean => typeof this.state.category.products !== 'undefined' &&
        this.state.category.products.length > 0
}