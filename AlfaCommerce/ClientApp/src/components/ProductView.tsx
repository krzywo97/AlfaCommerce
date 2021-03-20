import React from 'react'
import {Product} from '../api/models'
import {default as ProductsApi} from '../api/products'
import './ProductView.css'
import {Link} from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'

interface Props {
    id: number
}

interface State {
    product: Product,
    loadingProduct: boolean
}

export default class ProductView extends React.PureComponent<Props, State> {
    state: State = {
        product: {
            id: 0,
            name: '',
            price: 0,
            weight: 0,
            color: {
                id: 0,
                name: ''
            },
            photos: [],
            categories: []
        },
        loadingProduct: true
    }

    componentDidMount() {
        this.fetchDetails()
    }

    render() {
        return (
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>{this.state.product.name}</h5>
                    <div className='row'>
                        <div className='d-flex flex-row flex-nowrap overflow-scroll col-12 col-md-8 col-lg-8 my-2'>
                            {this.state.product.photos.map((p, i) => (
                                <div className='col-5 mb-2 px-2' key={i}>
                                    <a href={p.url} target='_blank'>
                                        <img key={p.url} src={p.url} alt='Zdjęcie produktu' className='scaled-image'/>
                                    </a>
                                </div>
                            ))}
                        </div>
                        <div className='d-flex flex-column col'>
                            <div className='bg-light p-2'>
                                <div className='d-flex flex-row justify-content-between px-3 py-1'>
                                    <span className='pt-1'>Cena:</span>
                                    <span className='text-danger fw-bold fs-4'>{this.state.product.price} zł</span>
                                </div>
                                <b className='px-3 py-1'>Dlaczego warto?</b>
                                <div className='d-flex flex-row justify-content-between px-3'>
                                    <span className='pt-1'>
                                        <i className="bi bi-calendar2-check pe-2"/>Dostawa gratis
                                    </span>
                                </div>
                                <div className='d-flex flex-row justify-content-between px-3'>
                                    <span className='pt-1'>
                                        <i className="bi bi-emoji-smile pe-2"/>Szybka dostawa - już jutro u Ciebie
                                    </span>
                                </div>
                                <div className='d-flex flex-row justify-content-between px-3'>
                                    <span className='pt-1'>
                                        <i className="bi bi-patch-check pe-2"/>Darmowe zwroty
                                    </span>
                                </div>
                                <button className='btn btn-warning w-100 my-2'>KUP TERAZ</button>
                            </div>
                        </div>
                    </div>
                    <h5 className='mt-2 mt-md-0'>Informacje o produkcie</h5>
                    <div className='row'>
                        <div className='col-12 col-md-5'>
                            <table className='table table-striped'>
                                <tbody>
                                <tr>
                                    <td>Kolor</td>
                                    <td>{this.state.product.color.name}</td>
                                </tr>
                                <tr>
                                    <td>Waga</td>
                                    <td>{this.state.product.weight}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <h5>Więcej z kategorii</h5>
                    <span>{this.state.product.categories.length > 0 ? this.state.product.categories.map<React.ReactNode>(c => (
                        <Link key={c.id} to={`/categories/${c.id}`}>{c.name}</Link>
                    )).reduce((prev, cur) => [prev, ' | ', cur]) : ''}</span>
                </div>
            </div>
        )
    }

    private fetchDetails = (): void => {
        ProductsApi.details(this.props.id)
            .then(response => {
                this.setState({
                    product: response.data,
                    loadingProduct: false
                })
            }, () => {
                this.setState({
                    loadingProduct: false
                })
            })
            .catch(() => {
                this.setState({
                    loadingProduct: false
                })
            })
    }
}