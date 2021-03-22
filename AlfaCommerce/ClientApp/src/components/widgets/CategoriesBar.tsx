import React from 'react'
import {Category} from '../../api/models'
import {Link} from 'react-router-dom'

interface Props {
    categories: Category[]
}

export default class CategoriesBar extends React.PureComponent<Props> {
    render() {
        return (
            <nav className='navbar navbar-expand-sm border-bottom mb-3 overflow-scroll no-scrollbar px-0 px-md-4 py-0'>
                <ul className='list-group list-group-flush list-group-horizontal'>
                    {this.props.categories.map(c => (
                        <li key={c.id} className='list-group-item border-0 bg-transparent'>
                            <Link to={`/categories/${c.id}`}
                                  className='text-underline-hover text-black-50'>{c.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}