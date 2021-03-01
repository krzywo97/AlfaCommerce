import React from 'react';
import Sidebar from "./sidebar/Sidebar";
import Categories from "./categories/Categories";
import {Route, Switch} from "react-router";
import Category from "./category/Category";

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
                            <Route path='/admin/categories' exact component={Categories}/>
                            <Route path='/admin/categories/:categoryId' render={(props => {
                                return <Category id={props.match.params.categoryId}/>
                            })}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}