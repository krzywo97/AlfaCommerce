import React from "react";

type Props = {
    id: string
}

export default class Category extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className='card'>
                <div className='card-body'>Kategoria {this.props.id}</div>
            </div>
        );
    }
}