import React from 'react'
import {default as ColorsApi} from '../../../api/colors'
import {default as ProductsApi} from '../../../api/products'
import {Color, Product} from '../../../api/models'
import {Route} from 'react-router'
import {History} from 'history'
import ProductTile from '../../widgets/ProductTile'
import Pagination from '../../widgets/Pagination'

type Props = {
    id: number
}

type State = {
    color: Color
    loadingDetails: boolean,
    newName: string,
    products: Product[],
    loadingProducts: boolean,
    currentPage: number,
    totalPages: number,
    totalProducts: number
}

export default class ColorDetailsView extends React.PureComponent<Props, State> {
    state: State = {
        color: {
            id: 0,
            name: ''
        },
        loadingDetails: true,
        newName: '',
        products: [],
        loadingProducts: true,
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0
    }

    componentDidMount(): void {
        this.fetchDetails()
        this.fetchProducts()
    }

    render() {
        return (
            <div>
                <div className='card'>
                    <div className='card-body bg-white'>
                        <h5 className='card-title mb-3'>{this.state.color.name}</h5>
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
                        <div className='row'>
                            <Route render={({history: History}) => (
                                <div className='d-flex flex-row-reverse col-12 col-md-9 col-lg-8'>
                                    <button className='btn btn-primary'
                                            onClick={() => this.saveChanges(History)}>Zapisz
                                    </button>
                                    <button className='btn btn-outline-danger me-2'
                                            disabled={this.state.totalProducts > 0}
                                            onClick={() => this.deleteColor(History)}>Usuń kolor
                                    </button>
                                </div>)}/>
                            {this.state.totalProducts > 0 ? (
                                <p className='text-danger mt-2 mb-0'>Nie można usunąć koloru, ponieważ istnieją
                                    przypisane do niego produkty</p>
                            ) : ''}
                        </div>
                    </div>
                </div>
                <div className='card mt-2'>
                    <div className='card-body'>
                        <h5 className='card-title'>Produkty w kolorze ({this.state.totalProducts})</h5>
                        <div className='d-flex flex-row flex-wrap'>
                            {this.state.products.map(p => (
                                <ProductTile key={p.id} name={p.name} imageUrl={p.photos[0].url}
                                             url={`/admin/products/${p.id}`}
                                             className='col-6 col-md-4 col-md-3 col-xl-2 p-2'/>
                            ))}
                        </div>
                        {this.state.totalProducts > 0 ? (
                            <div className='col-12 d-flex justify-content-center mt-2'>
                                <Pagination currentPage={this.state.currentPage} totalPages={this.state.totalPages}
                                            onPageChanged={this.changePage}/>
                            </div>
                        ) : (
                            <p className='alert alert-info mt-2'>Nie znaleziono produktów o danym kolorze</p>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    private fetchDetails = (): void => {
        ColorsApi.details(this.props.id)
            .then(response => {
                this.setState({
                    color: response.data,
                    loadingDetails: false,
                    newName: response.data.name
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

    private fetchProducts = (): void => {
        ProductsApi.get({
            color: this.props.id
        }, this.state.currentPage, 36).then(response => {
            this.setState({
                products: response.data.products,
                loadingProducts: false,
                totalProducts: response.data.totalProducts,
                totalPages: response.data.totalPages
            })
        })
    }

    private changePage = (page: number): void => {
        this.setState({
            currentPage: page
        }, () => this.fetchProducts())
    }

    private handleNewNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            newName: event.target.value
        })
    }

    private saveChanges = (history: History): void => {
        ColorsApi.edit({
            ...this.state.color,
            name: this.state.newName
        }).then(() => {
            history.push('/admin/colors')
        }, () => {

        }).catch(() => {

        })
    }

    private deleteColor = (history: History): void => {
        ColorsApi.delete(this.state.color.id)
            .then(() => {
                history.push('/admin/colors')
            }, () => {

            }).catch(() => {

        })
    }
}