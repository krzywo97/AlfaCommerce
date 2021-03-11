import React from 'react';
import {Route, Switch} from "react-router";
import Sidebar from "./sidebar/Sidebar";
import CategoriesView from "./categories/CategoriesView";
import CategoryDetailsView from "./categories/CategoryDetailsView";
import NewCategoryView from "./categories/NewCategoryView";
import ColorsView from "./colors/ColorsView";
import NewColorView from "./colors/NewCategoryView";
import ColorDetailsView from "./colors/ColorDetailsView";
import ProductsView from "./products/ProductsView";

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
                                return <CategoryDetailsView id={props.match.params.categoryId}/>
                            })}/>

                            <Route path='/admin/products' exact component={ProductsView}/>

                            <Route path='/admin/colors' exact component={ColorsView}/>
                            <Route path='/admin/colors/new' exact component={NewColorView}/>
                            <Route path='/admin/colors/:colorId' render={(props) => (
                                <ColorDetailsView id={props.match.params.colorId}/>
                            )}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}