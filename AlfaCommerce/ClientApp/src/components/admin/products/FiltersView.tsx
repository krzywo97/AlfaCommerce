import React from "react";
import Slider from 'bootstrap-slider'

export interface Props {
    onQueryChange: (query: string) => void,

}

export default class FiltersView extends React.PureComponent<Props, {}> {
    componentDidMount() {
        let slider = new Slider('#price-slider', {})
    }

    render() {
        return (
            <div className='row'>
                <div className='col'>
                    <input type='text' className='form-control' placeholder='Wpisz nazwę szukanego produktu'
                           onChange={e => this.props.onQueryChange(e.target.value)}/>
                    <input type='text' id='price-slider'/>
                </div>
            </div>
        );
    }
}