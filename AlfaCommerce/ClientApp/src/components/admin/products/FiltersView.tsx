import React from "react";

export interface Props {
    onQueryChange: (query: string) => void,

}

export default class FiltersView extends React.PureComponent<Props, {}> {
    componentDidMount() {
    }

    render() {
        return (
            <div className='row'>
                <div className='col'>
                    <input type='text' className='form-control' placeholder='Wpisz nazwę szukanego produktu'
                           onChange={e => this.props.onQueryChange(e.target.value)}/>
                </div>
            </div>
        );
    }
}