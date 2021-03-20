import * as React from 'react'
import {Route} from 'react-router'
import Home from './components/Home'
import Admin from './components/admin/Admin'
import './custom.css'
import CategoryView from './components/CategoryView'
import Layout from './components/Layout'

export default class App extends React.PureComponent {
    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route path='/admin' component={Admin}/>
                <Route path='/categories/:categoryId' render={props => {
                    let categoryId = props.match.params.categoryId
                    return <CategoryView key={categoryId} id={categoryId}/>
                }}/>
            </Layout>
        )
    }
}