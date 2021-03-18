import React from 'react'
import {Container} from 'reactstrap'
import NavMenu from '../components/widgets/NavMenu'
import CategoriesBar from "./widgets/CategoriesBar";

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
                <CategoriesBar categories={[]}/>
                <Container fluid={this.props.fluid} className={this.props.fluid ? 'p-0' : ''}>
                    {this.props.children}
                </Container>
            </React.Fragment>
        )
    }
}