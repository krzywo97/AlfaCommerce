import React from "react";
import {Category} from "../../../types/categories.interface";
import {default as api} from '../../../api/categories';
import {Link} from "react-router-dom";

type State = {
    loading: boolean,
    categories: Array<Category>
}

export default class Categories extends React.PureComponent<{}, State> {
    state: State = {
        loading: true,
        categories: Array<Category>()
    }

    componentDidMount() {
        this.fetchCategories()
    }

    render() {
        return (
            <div>
                <div className='card'>
                    <div className='card-body bg-white'>
                        <h5 className='card-title'>Kategorie</h5>
                        <button className='btn btn-link float-right' onClick={this.fetchCategories}>Odśwież</button>
                        <table className='table table-striped table-hover'>
                            <thead>
                            <tr className='thead-light'>
                                <th>Nazwa</th>
                                <th>Akcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.categories.map(c => (
                                    <tr>
                                        <td>{c.name}</td>
                                        <td><Link to={`/admin/categories/${c.id}`}>Szczegóły</Link></td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    private fetchCategories = (): void => {
        api.get()
            .then(response => {
                this.setState({
                    categories: response.data,
                    loading: false
                })
            }, () => {
                this.setState({
                    ...this.state,
                    loading: false
                })
            })
            .catch(() => {
                this.setState({
                    ...this.state,
                    loading: false
                })
            })
    }
}