import React from "react";
import {Product} from "../../../api/models";
import FiltersView from './FiltersView'

interface Filters {
    categories?: number[],
    colors?: number[],
    minPrice?: number,
    maxPrice?: number,
    minWeight?: number,
    maxWeight?: number,
    name?: string
}

interface State {
    filters: Filters,
    products: Product[]
}

export default class ProductsView extends React.PureComponent<{}, State> {
    state: State = {
        filters: {
            name: '',
            minPrice: undefined,
            maxPrice: undefined,
            minWeight: undefined,
            maxWeight: undefined,
            colors: [],
            categories: []
        },
        products: []
    }

    render() {
        return (
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>Produkty</h5>
                    <FiltersView onQueryChange={this.handleQueryChange}/>
                </div>
            </div>
        )
    }

    handleQueryChange = (query: string): void => {
        this.setState({
            filters: {
                ...this.state.filters,
                name: query,
            }
        })
    }
}