import * as React from 'react'
import {Route, Switch} from 'react-router'
import Home from './components/Home'
import Admin from './components/admin/Admin'

import './custom.css'
import CategoryView from './components/CategoryView'

export default () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/admin' component={Admin}/>
        <Route path='/categories/:categoryId' render={props => (
            <CategoryView id={props.match.params.categoryId}/>
        )}/>
    </Switch>
);