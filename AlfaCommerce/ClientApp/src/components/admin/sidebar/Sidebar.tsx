﻿import React from 'react';
import {Link} from "react-router-dom";

export default class Sidebar extends React.PureComponent {
    render() {
        return (
            <nav>
                <ul className='list-group'>
                    <li className='list-group-item'><Link to='/admin/categories'>Kategorie</Link></li>
                    <li className='list-group-item'><Link to='/'>Produkty</Link></li>
                    <li className='list-group-item'><Link to='/'>Kolory</Link></li>
                </ul>
            </nav>
        )
    }
}