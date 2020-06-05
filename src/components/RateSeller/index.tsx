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
import RateSeller from './RateSeller';
import styles from './index.module.scss';
import {fetchListing, getUserProfile} from '../../api';

interface RateProps {
  user: firebase.User | null | undefined;
  sellerId: string;
  listingId: string;
  creationTime: number; 
  reloadHome: Function; 
}

const Rate: React.FC<RateProps> = ({user, listingId, creationTime, sellerId, reloadHome }) => {
  const [show, setShow] = useState(false);
  const [listing, setListing] = useState();
  const [sellerName, setSellerName] = useState();
  const [sellerPic, setSellerPic] = useState();

  const callAPI = async () => {
    const userProfile = await getUserProfile(user, sellerId);
    setSellerName(userProfile.name)
    setSellerPic(userProfile.picture);
    console.log(sellerName);
    const listingResult = await fetchListing(user, setListing,[listingId], [creationTime]);
    console.log(listingResult);

  }

  useEffect(() => {
    callAPI();
  }, [true]);
  return (
    <>
      <Alert className={styles.center} variant="info">
        Recent Purchase!
        <Alert.Link onClick={() => setShow(true)}> Click Here</Alert.Link>
        {' '}
        to Rate Seller.
      </Alert>
      {listing && <RateSeller  user={user} picture={sellerPic} reloadHome={reloadHome} sellerName={sellerName} buyerId={listing[0].soldTo} listingId={listing[0].listingId} listingCreationTime={listing[0].creationTime} title={listing[0].title} sellerId={listing[0].userId} show={show} setShow={setShow} />}
    </>
  );
};
export default connect()(Rate);
