import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
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

interface HomeProps {
  dispatch: Dispatch<any>;
}

const Home: React.FC<HomeProps> = ({ dispatch }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  document.body.style.padding = "0px";
  return(
    <div>
      <Row className="justify-content-md-center">
          <Carousel responsive={responsive} className={styles.car}>
            <button className={styles.button}>All Filters</button>
            <button className={styles.button}>Tutoring</button>
            <button className={styles.button}>Rides</button>
            <button className={styles.button}>Textbooks</button>
            <button className={styles.button}>Sublease</button>
            <button className={styles.button}>Appliances</button>    
          </Carousel>
          <Form.Control type="text" placeholder="Search for an Item" style={{width: "60%"}} />
      </Row>
      <div className={styles.main}>
        <ul className={styles.cards}>
          <li className={styles.cards_item}>
            <Listing />
          </li>
          <li className={styles.cards_item}>
            <Listing />
          </li>
          <li className={styles.cards_item}>
            <Listing />
          </li>
          <li className={styles.cards_item}>
            <Listing />
          </li>
          <li className={styles.cards_item}>
            <Listing />
          </li>
          <li className={styles.cards_item}>
            <Listing />
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
}
export default connect()(Home);
