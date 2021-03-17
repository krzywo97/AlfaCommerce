import React from 'react'
import {Container} from 'reactstrap'
import NavMenu from '../components/widgets/NavMenu'

interface Props {
    fluid: boolean
}

export default class Layout extends React.PureComponent<Props, { children?: React.ReactNode }> {
    public static defaultProps: Props = {
        fluid: false
    }

    public render() {
        return (
            <React.Fragment>
                <NavMenu marginBottom={!this.props.fluid}/>
                <Container fluid={this.props.fluid}>
                    {this.props.children}
                </Container>
            </React.Fragment>
        )
    }
}