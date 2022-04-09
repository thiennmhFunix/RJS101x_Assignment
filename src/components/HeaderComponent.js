import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        }

        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return(
            <div className="container">
                <React.Fragment>
                    <Navbar dark expand="md">
                        <div className='container'>
                            <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="mr-auto" href='/'>
                                <img src="assets/images/logo.png" height="30" width="41" alt="logo " />
                            </NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/stafflist">
                                            <span className="fa fa-home fa-lg"></span> Nhân viên
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/departmentlist">
                                            <span className="fa fa-info fa-lg"></span> Phòng ban
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/salarylist">
                                            <span className="fa fa-list fa-lg"></span> Bảng lương
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                </React.Fragment>
            </div>
        );
    }
}

export default Header;