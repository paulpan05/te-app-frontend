import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authActions, modalActions } from '../../redux/actions';
import DefaultModal from '../../components/Modals';
import TestModal from '../../components/TestModal';
import OpenPopup from '../../components/openPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditListing from '../../components/editListing';
import FlowerImg from '../../assets/GreenShirt.png';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons'
import Listing from './Listing';

interface HomeProps {
  dispatch: Dispatch<any>;
}
const Home: React.FC<HomeProps> = ({ dispatch }) => (
<div>
  <Row className="justify-content-md-center">
    <div className = {styles.filterContainer}>
      <button className={styles.button}>All Filters</button>
      <button className={styles.button}>Tutoring</button>
      <button className={styles.button}>Rides</button>
      <button className={styles.button}>Textbooks</button>
      <button className={styles.button}>Sublease</button>
      <button className={styles.button}>Appliances</button>
      <Form.Control type="text" placeholder="Search for an Item"></Form.Control>
    </div>
  </Row>
  <div className={styles.main}>
    <ul className={styles.cards}>
      <li className= {styles.cards_item}>
      <Listing></Listing>
      </li>
      <li className= {styles.cards_item}>
      <Listing></Listing>
      </li>
      <li className= {styles.cards_item}>
      <Listing></Listing>
      </li>
      <li className= {styles.cards_item}>
      <Listing></Listing>
      </li>
      <li className= {styles.cards_item}>
      <Listing></Listing>
      </li>
      <li className= {styles.cards_item}>
      <Listing></Listing>
      </li>
    </ul>
  </div>
  <button
    onClick={() => {
      dispatch(authActions.signOut());
    }}
    type="submit"
  >
    Sign Out
  </button>
  </div>
);
export default connect()(Home);
