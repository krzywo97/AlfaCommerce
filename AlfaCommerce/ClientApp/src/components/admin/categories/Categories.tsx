import React from "react";
import {Category} from "../../../types/categories.interface";
import {default as api} from '../../../api/categories';
import {Link} from "react-router-dom";
import {Table} from "reactstrap";

type State = {
    loading: boolean,
    categories: Array<Category>
}

export default class Categories extends React.PureComponent<{}, State> {
    state = {
        loading: true,
        categories: Array<Category>()
    }

    constructor(props: {}) {
        super(props);

        api.get()
            .then(response => {
                this.setState({
                    loading: false,
                    categories: response.data
                })
            }, () => {
                this.setState({
                    loading: false,
                    ...this.state
                })
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    ...this.state
                })
            })
    }

    render() {
        return (
            <div>
                <div className='card'>
                    <div className='card-body bg-white'>
                        <h5 className='card-title'>Kategorie</h5>
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
}