import * as React from 'react'
import {Category} from '../api/models'
import {default as CategoriesApi} from '../api/categories'

interface State {
    categories: Category[],
    categoriesLoading: boolean
}

export default class Home extends React.PureComponent<{}, State> {
    state: State = {
        categories: [],
        categoriesLoading: true
    }

    componentDidMount() {
        this.fetchCategories()
    }

    render() {
        return (
            <div>
                <h5>Najnowsze produkty</h5>
            </div>
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
