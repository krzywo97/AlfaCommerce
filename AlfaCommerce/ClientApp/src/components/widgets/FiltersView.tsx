import React from 'react'
import {Filters} from '../../api/products'
import {Color} from '../../api/models'

interface Props {
    colors: Color[],
    filters: Filters,
    onFiltersChanged: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void,
    onResetFilters: () => void,
    onApplyFilters: () => void
}

export default class FiltersView extends React.PureComponent<Props> {
    render() {
        return (
            <div className='col'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='row mb-3'>
                            <div className='d-flex flex-row col justify-content-between'>
                                <h5 className='card-title text-center'>Filtry</h5>
                                <button className='btn btn-link text-underline-hover p-0'
                                        onClick={this.props.onResetFilters}>Wyczyść
                                </button>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col'>
                                <input type='text' className='form-control' name='name' placeholder='Nazwa produktu'
                                       value={this.props.filters.name}
                                       onChange={e => this.props.onFiltersChanged(e.target)}/>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col pe-1'>
                                <input type='number' step='0.01' className='form-control' name='minPrice'
                                       value={this.props.filters.minPrice}
                                       placeholder='Cena od' onChange={e => this.props.onFiltersChanged(e.target)}/>
                            </div>
                            <div className='col ps-1'>
                                <input type='number' step='0.01' className='form-control' name='maxPrice'
                                       value={this.props.filters.maxPrice}
                                       placeholder='Cena do' onChange={e => this.props.onFiltersChanged(e.target)}/>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col pe-1'>
                                <input type='number' step='0.01' className='form-control' name='minWeight'
                                       value={this.props.filters.minWeight}
                                       placeholder='Waga od' onChange={e => this.props.onFiltersChanged(e.target)}/>
                            </div>
                            <div className='col ps-1'>
                                <input type='number' step='0.01' className='form-control' name='maxWeight'
                                       value={this.props.filters.maxWeight}
                                       placeholder='Waga do' onChange={e => this.props.onFiltersChanged(e.target)}/>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col'>
                                <select className='form-select' value={this.props.filters.color} name='color'
                                        onChange={e => this.props.onFiltersChanged(e.target)}>
                                    <option key={0} value={0}>Dowolny kolor</option>
                                    {this.props.colors.map(c =>
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col'>
                                <button className='btn btn-primary w-100' onClick={this.props.onApplyFilters}>Zastosuj
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}