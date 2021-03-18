import * as React from 'react'
import {Route} from 'react-router'
import Home from './components/Home'
import Admin from './components/admin/Admin'

import './custom.css'
import CategoryView from './components/CategoryView'
import Layout from './components/Layout'
import {connect} from 'react-redux'
import {ApplicationState} from './store'

interface Props {
    fluid: boolean
}

class App extends React.PureComponent<Props> {
    render() {
        return (
            <Layout fluid={this.props.fluid}>
                <Route exact path='/' component={Home}/>
                <Route path='/admin' component={Admin}/>
                <Route path='/categories/:categoryId' render={props => (
                    <CategoryView id={props.match.params.categoryId}/>
                )}/>
            </Layout>
        )
    }
}

function mapStateToProps(state: ApplicationState): Props {
    return {
        fluid: state.ui?.fluid || true
    }
}

export default connect(mapStateToProps)(App)