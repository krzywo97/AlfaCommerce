import * as React from 'react'
import {Product} from '../api/models'
import {default as ProductsApi} from '../api/products'
import ProductTile from './widgets/ProductTile'

interface State {
    products: Product[],
    productsLoading: boolean
}

export default class Home extends React.PureComponent<{}, State> {
    state: State = {
        products: [],
        productsLoading: true
    }

    componentDidMount() {
        this.fetchProducts()
    }

    render() {
        return (
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>Najnowsze produkty</h5>
                    <div className='d-flex flex-row flex-wrap'>
                        {this.state.products.map(p => (
                            <ProductTile key={p.id} name={p.name} imageUrl={p.photos[0].url} url={`/products/${p.id}`}
                                         className='col-6 col-md-4 col-lg-3 col-xl-2 p-1'/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    fetchProducts = (): void => {
        ProductsApi.get()
            .then(response => {
                this.setState({
                    products: response.data,
                    productsLoading: false
                })
            })
    }
}
