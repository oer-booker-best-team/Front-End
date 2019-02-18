import React from "react"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap"
import { NavLink } from "react-router-dom"

import { NavWrapper } from "../../styles/navigationStyles"
import { Logout } from "../../styles/formStyles"
import logo from "../../assets/images/bookcase.jpg"

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <NavWrapper>
        <Navbar fixed="top" color="dark" dark expand="md">
          <NavbarBrand href="/">
            <img src={logo} alt="logo" />
            OER-Bookr
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/" exact>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/books/add" exact>
                  Add
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signIn" exact>
                  Sign In
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/login" exact>
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <a href="/">
                  <Logout
                    onClick={() => {
                      localStorage.removeItem("currentUser")
                      localStorage.removeItem("jwt")
                    }}
                  >
                    Logout
                  </Logout>
                </a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </NavWrapper>
    )
  }
}

export default Navigation
