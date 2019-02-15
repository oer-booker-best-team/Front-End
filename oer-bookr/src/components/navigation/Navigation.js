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
            <img
              src="https://www.clipartmax.com/png/small/0-3414_clipart-pile-of-books-cartoon-free-download-clip-art-cartoon-pile-of.png"
              width="33"
              height="33"
              className="d-inline-block align-top"
              alt=""
            />
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
                <a href="/">
                  <Logout
                    onClick={() => localStorage.removeItem("currentUser")}
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
