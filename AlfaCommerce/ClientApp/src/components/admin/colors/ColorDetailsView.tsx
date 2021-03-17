import React from 'react'
import {default as api} from '../../../api/colors'
import {Color} from '../../../api/models'
import {Route} from 'react-router'
import {History} from 'history'

type Props = {
    id: number
}

type State = {
    color: Color
    loading: boolean,
    newName: string
}

export default class ColorDetailsView extends React.PureComponent<Props, State> {
    state: State = {
        color: {
            id: 0,
            name: ''
        },
        loading: true,
        newName: ''
    }

    componentDidMount(): void {
        this.fetchDetails()
    }

    render() {
        return (
            <div>
                <div className='card'>
                    <div className='card-body bg-white'>
                        <h5 className='card-title mb-3'>{this.state.color.name}</h5>
                        <div className='row mb-3'>
                            <div className='col-2 col-form-label'>
                                <label htmlFor='id'>Identyfikator</label>
                            </div>
                            <div className='col-4'>
                                <input type='text' id='id' className='form-control' readOnly={true}
                                       value={this.props.id}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-2 col-form-label">
                                <label htmlFor='new-name'>Nazwa</label>
                            </div>
                            <div className="col-4">
                                <input type="text" id="new-name" className='form-control'
                                       onChange={this.handleNewNameChange} value={this.state.newName}/>
                            </div>
                        </div>
                        <div className='row'>
                            <Route render={() => (
                                <div className='d-flex flex-row-reverse col-6'>
                                    <button className='btn btn-primary' onClick={this.saveChanges}>Zapisz</button>
                                </div>)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    fetchDetails = (): void => {
        api.details(this.props.id)
            .then(response => {
                this.setState({
                    color: response.data,
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

    deleteColor = (history: History): void => {
        api.delete(this.state.color.id)
            .then(() => {
                history.push('/admin/categories')
            }, () => {

            }).catch(() => {

        })
    }
}