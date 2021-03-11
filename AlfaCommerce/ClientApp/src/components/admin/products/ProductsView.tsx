import React from "react";
import {Product} from "../../../api/models";

interface Filters {
    categories?: number[],
    colors?: number[],
    price?: Range,
    weight?: Range,
    name?: string
}

interface State {
    filters: Filters,
    products: Product[]
}

export default class ProductsView extends React.PureComponent<{}, State> {
    render() {
        return (
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>Produkty</h5>
                </div>
            </div>
        )
    }
}