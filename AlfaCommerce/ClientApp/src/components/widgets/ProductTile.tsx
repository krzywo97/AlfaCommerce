import React from 'react'
import {Link} from 'react-router-dom'
import {ConditionalWrapper} from './ConditionalWrapper'

export interface Props {
    name: string,
    imageUrl: string,
    url?: string
}

export default (props: Props) => (
    <div className='col-3 p-2'>
        <ConditionalWrapper condition={(props.url ?? '').length > 0}
                            wrapper={(children: any) => (
                                <Link to={props.url ?? ''}
                                      className='text-dark text-underline-hover'>{children}</Link>
                            )}>
            <img src={props.imageUrl} className='card-img-top' alt='Zdjęcie produktu'/>
            <div className='card p-3'>
                <span className='card-title'>{props.name}</span>
            </div>
        </ConditionalWrapper>
    </div>
)