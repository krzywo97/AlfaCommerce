import React from "react";
import {Color} from "../../../api/models";
import {default as api} from '../../../api/colors'
import {Link} from "react-router-dom";

export interface State {
    loading: boolean
    colors: Color[]
}

export default class ColorsView extends React.PureComponent<{}, State> {
    state: State = {
        loading: true,
        colors: []
    }

    componentDidMount() {
        this.fetchColors()
    }

    render() {
        return (
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>Kolory</h5>
                    <table className='table table-hover table-striped'>
                        <thead>
                        <tr className='thead-light'>
                            <th>Nazwa</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.colors.map(c => (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td><Link to={`/admin/colors/${c.id}`}>Szczegóły</Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className='row'>
                        <div className='col'>
                            <Link to='/admin/colors/new' className='btn btn-outline-primary'>Nowy kolor</Link>
                            <button className='btn btn-outline-primary ml-2' onClick={this.fetchColors}>Odśwież</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    private fetchColors = (): void => {
        api.get()
            .then(response => {
                this.setState({
                    colors: response.data,
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