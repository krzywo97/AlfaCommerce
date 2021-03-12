import React from "react";
import {Category} from "../../../api/models";
import {default as api} from '../../../api/categories';
import {Link} from "react-router-dom";

type State = {
    loading: boolean,
    categories: Category[]
}

export default class CategoriesView extends React.PureComponent<{}, State> {
    state: State = {
        loading: true,
        categories: []
    };

    componentDidMount(): void {
        this.fetchCategories()
    }

    render() {
        return (
            <div>
                <div className='card'>
                    <div className='card-body bg-white'>
                        <h5 className='card-title'>Kategorie</h5>
                        <table className='table table-light table-striped table-hover'>
                            <thead>
                            <tr>
                                <th>Nazwa</th>
                                <th>Akcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.categories.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.name}</td>
                                        <td><Link className='text-underline-hover' to={`/admin/categories/${c.id}`}>Szczegóły</Link></td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                        <div className='row'>
                            <div className='col'>
                                <Link to='/admin/categories/new' className='btn btn-outline-primary'>Nowa
                                    kategoria</Link>
                                <button className='btn btn-outline-primary ms-2'
                                        onClick={this.fetchCategories}>Odśwież
                                </button>
                            </div>
                        </div>
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