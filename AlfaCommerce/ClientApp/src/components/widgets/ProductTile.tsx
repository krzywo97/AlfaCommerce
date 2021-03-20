import React from 'react'
import {Link} from 'react-router-dom'
import {ConditionalWrapper} from './ConditionalWrapper'

export interface Props {
    name: string,
    imageUrl: string,
    url?: string,
    className: string
}

export default (props: Props) => (
    <div className={props.className}>
        <ConditionalWrapper condition={(props.url ?? '').length > 0}
                            wrapper={(children: any) => (
                                <Link to={props.url ?? ''}
                                      className='text-dark text-underline-hover'>{children}</Link>
                            )}>
            <div className='card'>
                <img src={props.imageUrl} className='card-img-top' alt='Zdjęcie produktu'/>
                <div className='card-body'>
                    <span className='card-title'>{props.name}</span>
                </div>
            </div>
        </ConditionalWrapper>
    </div>
)