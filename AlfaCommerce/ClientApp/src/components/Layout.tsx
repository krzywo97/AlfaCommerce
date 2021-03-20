import React from 'react'
import {Container} from 'reactstrap'
import NavMenu from '../components/widgets/NavMenu'
import CategoriesBar from './widgets/CategoriesBar'
import {ApplicationState} from '../store'
import {Category} from '../api/models'
import {connect} from 'react-redux'

export interface Props {
    categories?: Category[],
    loadingCategories?: boolean
}

class Layout extends React.PureComponent<Props> {
    public render() {
        return (
            <React.Fragment>
                <NavMenu/>
                <CategoriesBar categories={this.props.categories ?? []}/>
                <Container>
                    {this.props.children}
                </Container>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state: ApplicationState, ownProps?: Props): Props {
    return {
        categories: state.categories?.data ?? [],
        loadingCategories: state.categories?.loading ?? true
    }
}

export default connect(mapStateToProps)(Layout)