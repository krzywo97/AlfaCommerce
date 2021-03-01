import React from "react";
import {Category} from "../../../types/categories.interface";

type State = {
    loading: boolean,
    categories: Array<Category>
}

export default class Categories extends React.PureComponent {
    render() {
        return (
            <div>
                <div className='card'>
                    <div className='card-body'>
                        <h5 className='card-title'>Kategorie</h5>
                        
                    </div>
                </div>
            </div>
        )
    }
}