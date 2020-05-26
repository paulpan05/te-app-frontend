import React, { useState } from 'react';
import NavBar from 'react-bootstrap/Navbar';
import { NavDropdown, Nav, Image, DropdownButton, Dropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import profile from '../../assets/Profile.png';
import { authActions } from '../../redux/actions';
import CreateListing from '../CreateListing/index';
import EditProfile from '../EditProfile/buttonExample';

interface NavbarProps {
  dispatch: Dispatch<any>;
}

const Navbar: React.FC<NavbarProps> = ({ dispatch }) => {
  const [redirect, redirectTo] = useState('/');
  const [showCreateListing, setShowCreateListing] = useState(false);

  return (
    <div>
      <NavBar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <NavBar.Brand onClick={() => redirectTo("/")}>Triton Exchange</NavBar.Brand>
      <NavBar.Toggle aria-controls="responsive-navbar-nav" />
      <NavBar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link onClick={() => redirectTo("/")}>Home</Nav.Link>
        <Nav.Link onClick={() => redirectTo("/profile")}>Saved</Nav.Link>
        <Nav.Link onClick={() => redirectTo("/editprofile")}>Edit Profile</Nav.Link>
        <Nav.Link onClick={() => setShowCreateListing(true)}>Sell</Nav.Link>
        <DropdownButton
          alignRight
          title="Profile"
          id="dropdown-menu-align-right"
          img="profile"
          >
          <Dropdown.Item
            eventKey="1"
            onClick={() => {
              dispatch(authActions.signOut());
            }}
            >
            Logout
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="2" onClick={() => redirectTo("/profile")}>View Profile</Dropdown.Item>
          </DropdownButton>
          <Redirect to={redirect} />
          </Nav>
        </NavBar.Collapse>
      </NavBar>

      <CreateListing show={showCreateListing} setShow={setShowCreateListing} />
    </div>
  );
};

export default Navbar;
