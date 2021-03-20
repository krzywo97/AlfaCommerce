import * as React from 'react'
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap'
import {Link} from 'react-router-dom'
import './NavMenu.css'

interface State {
    isOpen: boolean
}

export default class NavMenu extends React.PureComponent<{}, State> {
    public state: State = {
        isOpen: false
    }

    public render() {
        return (
            <header>
                <Navbar className='navbar-expand-sm navbar-toggleable-sm border-bottom' light>
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
