import React from 'react';
import {Route, Switch} from "react-router";
import Sidebar from "./sidebar/Sidebar";
import CategoriesView from "./categories/CategoriesView";
import CategoryView from "./categories/CategoryView";
import NewCategoryView from "./categories/NewCategoryView";

export default class Admin extends React.PureComponent {
    public render() {
        return (
            <div>
                <div className='d-flex flex-row'>
                    <div className='col-3'>
                        <Sidebar/>
                    </div>
                    <div className='col'>
                        <Switch>
                            <Route path='/admin' exact component={CategoriesView}/>
                            <Route path='/admin/categories' exact component={CategoriesView}/>
                            <Route path='/admin/categories/new' exact component={NewCategoryView}/>
                            <Route path='/admin/categories/:categoryId' render={(props => {
                                return <CategoryView id={props.match.params.categoryId}/>
                            })}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}