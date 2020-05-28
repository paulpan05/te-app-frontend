import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { authActions, modalActions } from '../../redux/actions';
import DefaultModal from '../../components/Modals';
import TestModal from '../../components/TestModal';
import OpenPopup from '../../components/openPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditListing from '../../components/editListing';
import FlowerImg from '../../assets/GreenShirt.png';
import styles from './index.module.scss';
import Listing from '../../components/Listing/Listing';
import Carousel from 'react-multi-carousel';
import TagButton from '../../components/Button';
import Tags from '../../components/Tags';
import Rate from '../../components/RateSeller';

import { rootState } from '../../redux/reducers';
import { getUserProfile, userSignup } from '../../api';

interface HomeProps {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
}
const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const Home: React.FC<HomeProps> = ({ dispatch, user }) => {
  return (
    <div>
      <Rate />
      <Row className="justify-content-md-center">
        <Tags />
      </Row>
      <Row className="justify-content-md-center">
        <form className="example">
          <input className={styles.input} type="text" placeholder="Search.." name="search" />
          <button className={styles.searchButton} type="submit">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
        </form>
      </Row>

      {/* <Form>
     <Form.Control className="mr-sm-2" type="text" placeholder="Search for an Item" />
     </Form> */}

      <Container fluid>
        <Row xs={1} md={2} lg={4}>
          <Col>
            <Listing />
          </Col>
          <Col>
            <Listing />
          </Col>
          <Col>
            <Listing />
          </Col>
          <Col>
            <Listing />
          </Col>
        </Row>
        <Row xs={1} md={2} lg={4}>
          <Col>
            <Listing />
          </Col>
          <Col>
            <Listing />
          </Col>
          <Col>
            <Listing />
          </Col>
          <Col>
            <Listing />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
/* const Home: React.FC<HomeProps> = ({ dispatch, user }) => (
  <>
    <button
      onClick={() => {
        dispatch(authActions.signOut());
      }}
      type="submit"
    >
      Sign Out
    </button>
    <button
      onClick={async () => {
        await userSignup(user);
      }}
      type="submit"
    >
      Sample Fetch
    </button>
    <button
      type="submit"
      onClick={async () => {
        await getUserProfile(user);
      }}
    >
      Sample User
    </button>
  </>
); */

export default connect(mapStateToProps)(Home);
