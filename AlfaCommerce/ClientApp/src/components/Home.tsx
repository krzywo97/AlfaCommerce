import * as React from 'react'
import {connect} from 'react-redux'
import CategoriesBar from './widgets/CategoriesBar'
import Layout from './Layout'
import {Category} from '../api/models'
import {default as CategoriesApi} from '../api/categories'

interface State {
    categories: Category[],
    categoriesLoading: boolean
}

class Home extends React.PureComponent<{}, State> {
    state: State = {
        categories: [],
        categoriesLoading: true
    }

    componentDidMount() {
        this.fetchCategories()
    }

    render() {
        return (
            <Layout fluid={true}>
                <CategoriesBar categories={this.state.categories}/>
                <h5>Najnowsze produkty</h5>
            </Layout>
        )
    }

    fetchCategories = (): void => {
        CategoriesApi.get()
            .then(response => {
                this.setState({
                    categories: response.data,
                    categoriesLoading: false
                })
            })
    }
}

export default connect()(Home)
