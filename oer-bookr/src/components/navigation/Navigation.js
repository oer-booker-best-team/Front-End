import React from "react"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"

import { NavWrapper } from "../../styles/navigationStyles"

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
        <Navbar color="dark" dark expand="md" fixed-top>
          <NavbarBrand href="/">
            <img
              src="https://www.clipartmax.com/png/small/0-3414_clipart-pile-of-books-cartoon-free-download-clip-art-cartoon-pile-of.png"
              width="33"
              height="33"
              class="d-inline-block align-top"
              alt=""
            />
            OER-Bookr
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/" active>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </NavWrapper>
    )
  }
}

export default Navigation
