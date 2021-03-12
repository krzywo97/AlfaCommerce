import React, {PureComponent} from "react";
import {default as api} from '../../../api/categories';
import {Route} from "react-router";
import {History} from "history";

interface State {
    name: string
}

export default class NewCategoryView extends PureComponent<{}, State> {
    state = {
        name: ''
    }

    render() {
        return (
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title mb-3'>Nowa kategoria</h5>
                    <div className='form-group row mb-3'>
                        <div className='col-2 col-form-label'>
                            <label htmlFor='name'>Nazwa</label>
                        </div>
                        <div className='col-4'>
                            <input type='text' className='form-control' id='name' name='name'
                                   onChange={this.handleNameChange}/>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <Route render={({history: History}) => (
                            <div className='d-flex flex-row-reverse col-6'>
                                <button onClick={() => this.save(History)} className='btn btn-primary'>Zapisz</button>
                            </div>
                        )}/>
                    </div>
                </div>
            </div>
        )
    }

    handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            name: event.target.value
        })
    }

    save = (history: History): void => {
        api.add({
            name: this.state.name,
            parentId: undefined
        }).then(response => {
            history.push('/admin/categories');
        }, () => {

        }).catch(() => {

        })
    }
}