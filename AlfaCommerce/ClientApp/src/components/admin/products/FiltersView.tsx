import React from "react";
import {Category, Color} from "../../../api/models";

export interface Props {
    categories: Category[],
    colors: Color[],
    onFiltersChanged: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void,
    onApplyFilters: () => void
}

export default class FiltersView extends React.PureComponent<Props> {

    render() {
        return (
            <div>
                <div className='row mb-3'>
                    <div className='col-4'>
                        <input type='text' className='form-control' placeholder='Wpisz nazwę szukanego produktu'
                               name='name' onChange={e => this.props.onFiltersChanged(e.target)}/>
                    </div>
                    <div className='col-3'>
                        <select className='form-select' name='category' aria-label='Kategoria'
                                onChange={e => this.props.onFiltersChanged(e.target)}>
                            <option value={0}>Botki</option>
                            <option value={1}>Sneakersy</option>
                        </select>
                    </div>
                    <div className='col-3'>
                        <select className='form-select' name='color' aria-label='Kolor'
                                onChange={e => this.props.onFiltersChanged(e.target)}>
                            <option>Czarny</option>
                            <option>Biały</option>
                        </select>
                    </div>
                </div>
                <div className='row flex-row'>
                    <div className='col-2'>
                        <input type='text' name='minPrice' className='form-control' placeholder='Cena od'
                               onChange={e => this.props.onFiltersChanged(e.target)}/>
                    </div>
                    <div className='col-2'>
                        <input type='text' name='maxPrice' className='form-control' placeholder='Cena do'
                               onChange={e => this.props.onFiltersChanged(e.target)}/>
                    </div>
                    <div className='col-2'>
                        <input type='text' name='minWeight' className='form-control' placeholder='Masa od'
                               onChange={e => this.props.onFiltersChanged(e.target)}/>
                    </div>
                    <div className='col-2'>
                        <input type='text' name='maxWeight' className='form-control' placeholder='Masa do'
                               onChange={e => this.props.onFiltersChanged(e.target)}/>
                    </div>
                    <div className='col-2'>
                        <button className='btn btn-primary w-100' onClick={this.props.onApplyFilters}>Filtruj</button>
                    </div>
                </div>
            </div>
        );
    }
}