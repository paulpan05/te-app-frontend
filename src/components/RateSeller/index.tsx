import React, { useState, useEffect } from 'react';
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
import {fetchListing} from '../../api';

interface RateProps {
  user: firebase.User | null | undefined;
  sellerId: string;
  listingId: string;
  creationTime: number; 
}

const Rate: React.FC<RateProps> = ({user, listingId, creationTime}) => {
  const [show, setShow] = useState(false);
  const [listing, setListing] = useState();

  const callAPI = async () => {
    const listingResult = await fetchListing(user, setListing,[listingId], [creationTime]);
    console.log("wassup");
    console.log(listingResult);
  }

  useEffect(() => {
    callAPI();
  }, [true]);
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
