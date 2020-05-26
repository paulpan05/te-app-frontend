import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
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
import TagButton from '../../components/Button';
import Tags from '../../components/Tags';

interface SavedProps {
  dispatch: Dispatch<any>;
}

const Saved: React.FC<SavedProps> = ({ dispatch }) => (
  <div>
    <h1 className={styles.title}>Saved Listings</h1>

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
export default connect()(Saved);
