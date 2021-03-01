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
            <div>Kategoria {this.props.id}</div>
        );
    }
}