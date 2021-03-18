import React from 'react'
import {Category} from '../../api/models'
import {Link} from 'react-router-dom'

interface Props {
    categories: Category[]
}

export default class CategoriesBar extends React.PureComponent<Props> {
    render() {
        return (
            <nav className='navbar navbar-expand-sm border-bottom mb-3'>
                <ul className='list-group list-group-horizontal'>
                    {this.props.categories.map(c => (
                        <li key={c.id} className='list-group-item'>
                            <Link to={`/categories/${c.id}`} className='text-underline-hover'>{c.name}</Link></li>
                    ))}
                </ul>
            </nav>
        )
    }
}