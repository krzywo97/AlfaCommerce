import React from 'react';
import {Link} from "react-router-dom";

export default () => (
    <nav className='card'>
        <ul className='list-group list-group-flush'>
            <li className='list-group-item'><Link to='/admin/categories'>Kategorie</Link></li>
            <li className='list-group-item'><Link to='/'>Produkty</Link></li>
            <li className='list-group-item'><Link to='/admin/colors'>Kolory</Link></li>
        </ul>
    </nav>
)