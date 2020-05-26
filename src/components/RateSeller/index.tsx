import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
// import StarRatings from 'react-star-ratings';
import Alert from 'react-bootstrap/Alert';
import ProfileImg from '../../assets/img/sarah.png';
import RateSeller from './RateSeller';
import styles from './index.module.scss';

/* <StarRatings
          rating={2.403}
          starRatedColor="#FDCC0D"
          starDimension="40px"
          starSpacing="15px"
          className={styles.rating}
        /> */

const Rate: React.FC = ({}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Alert className={styles.center} variant="info">
        Recent Purchase!
        <Alert.Link onClick={() => setShow(true)}> Click Here</Alert.Link>
{' '}
to Rate Seller.
</Alert>
      <RateSeller title="Flower Sweatshirt" seller="Sarah A." show={show} setShow={setShow} />
    </div>
  );
};
export default connect()(Rate);
