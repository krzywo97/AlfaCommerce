import React from 'react'
import Layout from './Layout'

interface Props {
    id: number
}

export default class CategoryView extends React.PureComponent<Props, {}> {
    render() {
        return (
            <Layout fluid={false}>
                <div className='d-flex flex-row'>
                    <div className='col-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <p className='card-text'>Filtry</p>
                            </div>
                        </div>
                    </div>
                    <div className='col ms-3'>
                        <div className='card'>
                            <div className='card-body'>
                                Produkty
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}