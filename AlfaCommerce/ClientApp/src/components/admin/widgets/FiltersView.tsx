import React from 'react'
import {Category, Color} from '../../../api/models'

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
                    <div className='col-12 col-md-4 mb-3 mb-md-0 pe-2 pe-md-0'>
                        <input type='text' className='form-control' placeholder='Wpisz nazwę szukanego produktu'
                               name='name' onChange={e => this.props.onFiltersChanged(e.target)}/>
                    </div>
                    <div className='col-6 col-md-3 pe-1'>
                        <select className='form-select' name='category' aria-label='Kategoria'
                                onChange={e => this.props.onFiltersChanged(e.target)}>
                            {this.props.categories.map(c => (
                                <option value={c.id} key={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-6 col-md-3 ps-1'>
                        <select className='form-select' name='color' aria-label='Kolor'
                                onChange={e => this.props.onFiltersChanged(e.target)}>
                            {this.props.colors.map(c => (
                                <option value={c.id} key={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='row flex-row'>
                    <div className='col-3 col-md-2 pe-1'>
                        <input type='text' name='minPrice' className='form-control' placeholder='Cena od'
                               onChange={e => this.props.onFiltersChanged(e.target)}/>
                    </div>
                    <div className='col-3 col-md-2 pe-1 ps-1'>
                        <input type='text' name='maxPrice' className='form-control' placeholder='Cena do'
                               onChange={e => this.props.onFiltersChanged(e.target)}/>
                    </div>
                    <div className='col-3 col-md-2 pe-1 ps-1'>
                        <input type='text' name='minWeight' className='form-control' placeholder='Masa od'
                               onChange={e => this.props.onFiltersChanged(e.target)}/>
                    </div>
                    <div className='col-3 col-md-2 ps-1'>
                        <input type='text' name='maxWeight' className='form-control' placeholder='Masa do'
                               onChange={e => this.props.onFiltersChanged(e.target)}/>
                    </div>
                    <div className='col-12 col-md-2 mt-3 mt-md-0 ps-md-0'>
                        <button className='btn btn-primary w-100' onClick={this.props.onApplyFilters}>Filtruj</button>
                    </div>
                </div>
            </div>
        )
    }
}