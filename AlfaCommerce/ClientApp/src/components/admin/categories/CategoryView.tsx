import React from "react";
import {default as api} from '../../../api/categories';
import {Category} from "../../../api/models";
import './CategoryView.css'
import {Route} from "react-router";
import {History} from "history";

type Props = {
    id: number
}

type State = {
    category: Category
    loading: boolean,
    newName: string
}

export default class CategoryView extends React.PureComponent<Props, State> {
    state: State = {
        category: {
            id: 0,
            name: '',
            products: []
        },
        loading: true,
        newName: ''
    };

    componentDidMount(): void {
        this.fetchDetails();
    }

    render() {
        return (
            <div>
                <div className='card'>
                    <div className='card-body bg-white'>
                        <h5 className='card-title'>{this.state.category.name}</h5>
                        <div className='form-group row'>
                            <div className='col-2 col-form-label'>
                                <label htmlFor='id'>Identyfikator</label>
                            </div>
                            <div className='col-4'>
                                <input type='text' id='id' className='form-control' readOnly={true}
                                       value={this.props.id}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-2 col-form-label">
                                <label htmlFor='new-name'>Nazwa</label>
                            </div>
                            <div className="col-4">
                                <input type="text" id="new-name" className='form-control'
                                       onChange={this.handleNewNameChange} value={this.state.newName}/>
                            </div>
                        </div>
                        <div className='form-group row'>
                            <Route render={({history: History}) => (
                            <div className='d-flex flex-row-reverse col-6'>
                                <button className='btn btn-primary' onClick={this.saveChanges}>Zapisz</button>
                                <button className='btn btn-outline-danger mr-2' onClick={() => this.deleteCategory(History)}
                                        disabled={this.state.loading || this.hasProducts()}>Usuń
                                    kategorię
                                </button>
                            </div>)} />
                        </div>
                        {this.hasProducts() ? (
                            <p className='text-danger'>
                                Nie można usunąć kategorii, ponieważ zawiera ona produkty
                            </p>
                        ) : ''}
                    </div>
                </div>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <h5 className='card-title'>Produkty w kategorii {
                            typeof this.state.category.products !== 'undefined' ? '(' + this.state.category.products.length + ')' : ''
                        }</h5>
                        <div className='card-deck'>
                            {typeof this.state.category.products !== 'undefined' ? this.state.category.products.map(p => (
                                <div key={p.id} className='col p-0'>
                                    <div className='card'>
                                        <img src={p.photos[0].url} alt='Zdjęcie produktu'
                                             className='card-img-top'/>
                                        <div className='card-body'>
                                            <h6 className='card-title'>{p.name}</h6>
                                        </div>
                                    </div>
                                </div>
                            )) : ''}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    fetchDetails = (): void => {
        api.details(this.props.id)
            .then(response => {
                this.setState({
                    category: response.data,
                    loading: false,
                    newName: response.data.name
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

    handleNewNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            newName: event.target.value
        })
    }

    saveChanges = (): void => {

    }

    deleteCategory = (history: History): void => {
        api.delete(this.state.category.id)
            .then(response => {
                history.push('/admin/categories')
            }, () => {

            }).catch(() => {

        })
    }

    hasProducts = (): boolean => typeof this.state.category.products !== 'undefined' &&
        this.state.category.products.length > 0
}