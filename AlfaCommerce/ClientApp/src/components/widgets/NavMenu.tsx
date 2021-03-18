import * as React from 'react'
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap'
import {Link} from 'react-router-dom'
import './NavMenu.css'

interface Props {
    marginBottom: boolean
}

interface State {
    isOpen: boolean
}

export default class NavMenu extends React.PureComponent<Props, State> {
    public state: State = {
        isOpen: false
    }

    public render() {
        let navbarClass = 'navbar-expand-sm navbar-toggleable-sm border-bottom'
        if (this.props.marginBottom) {
            navbarClass += ' mb-3 box-shadow'
        }

        return (
            <header>
                <Navbar className={navbarClass} light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">AlfaCommerce</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/admin">Panel
                                        administracyjny</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}
