import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';


function NavbarPage() {
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='navbar-container'>
        <Navbar fixed="top" color="secondary" dark>
        <NavbarToggler onClick={toggle} />
        <NavbarBrand href="/">Colombo Restaurant</NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">Foods</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Reports">Reports</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarPage