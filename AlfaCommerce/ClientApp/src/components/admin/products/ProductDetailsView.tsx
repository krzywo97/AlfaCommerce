import React from "react";
import {Product} from "../../../api/models";
import {default as api} from '../../../api/products'

export interface Props {
    id: number
}

interface State {
    product: Product,
    loading: boolean
}

export default class ProductDetailsView extends React.PureComponent<Props, State> {
    state = {
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
        loading: true
    }

    componentDidMount() {
        this.fetchDetails()
    }

    render() {
        return (
            <div>
                <div className='card'>
                    <div className='card-body'>
                        <h5>{this.state.product.name}</h5>
                    </div>
                </div>
            </div>
        )
    }

    fetchDetails = (): void => {
        api.details(this.props.id)
            .then(response => {
                this.setState({
                    loading: false,
                    product: response.data
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
}