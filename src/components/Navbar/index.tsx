import React, { useState, useEffect } from 'react';
import NavBar from 'react-bootstrap/Navbar';
import { NavDropdown, Nav, Image, DropdownButton, Dropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import profile from '../../assets/img/sarah.png';
import b from '../../assets/img/full-app-logo.svg';
import { authActions } from '../../redux/actions';
import CreateListing from '../CreateListing/index';
import styles from './index.module.scss';
import { rootState } from '../../redux/reducers';
import { getUserProfile } from '../../api/index';

interface NavbarProps {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const Navbar: React.FC<NavbarProps> = ({ user, dispatch }) => {
  const [redirect, redirectTo] = useState('/');
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [profile, setProfile] = useState<string>();

  const getAndSetProfile = async () => {
    if (user) {
      const result = await getUserProfile(user);
      setProfile(result.picture);
    }
  }

  useEffect(() => {
    getAndSetProfile();
  }, [user]);

  return (
    <div>
      <NavBar collapseOnSelect className={styles.navbar} expand="lg" variant="dark">
        <NavBar.Brand className="hoverPointer" onClick={() => redirectTo('/')}>Triton Exchange</NavBar.Brand>
        <NavBar.Toggle aria-controls="responsive-navbar-nav" />
        <NavBar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => redirectTo('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => redirectTo('/saved')}>Saved</Nav.Link>
            <NavDropdown
              eventKey={1}
              drop="left"
              title={<img className={styles.thumbnail_image} src={profile} alt="user pic" />}
              id="dropdown-button-drop-left"
            >
              <Dropdown.Item eventKey="1" onClick={() => redirectTo('/profile')} active={false}>
                View Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                eventKey="2"
                onClick={() => {
                  dispatch(authActions.signOut());
                }}
                active={false}
              >
                Logout
              </Dropdown.Item>
            </NavDropdown>
          </Nav>
        </NavBar.Collapse>
      </NavBar>

      <Redirect to={redirect} />

     
    </div>
  );
};

export default connect(mapStateToProps)(Navbar);
