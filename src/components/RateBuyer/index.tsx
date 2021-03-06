import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Rating from '@material-ui/lab/Rating';
import { toast } from 'react-toastify';
import styles from './index.module.scss';
import { searchUser, markAsSold, addListingToRate, addUserRating } from '../../api';

interface RateBuyerProps {
  show: boolean;
  setShow: Function;
  title: string;
  user: firebase.User | null | undefined;
  sellerInfo: any;
  listingData: any;
  setReload?: Function;
  closeListing?: Function;
}

const RateBuyer: React.FC<RateBuyerProps> = ({
  show,
  setShow,
  title,
  user,
  sellerInfo,
  listingData,
  setReload,
  closeListing,
}) => {
  const [starValue, setStarValue] = React.useState<number | null>(2);
  const [buyerName, setBuyerName] = useState('');

  const callAPI = async () => {
    let userProfile;
    if (buyerName.includes('@')) {
      userProfile = await searchUser(user, undefined, buyerName);
    } else {
      userProfile = await searchUser(user, buyerName);
    }

    if (userProfile.length !== 0) {
      await markAsSold(
        user,
        listingData.listingId,
        listingData.creationTime,
        sellerInfo.userId,
        userProfile[0].userId,
      );
      // TODO: how do i update the buyers rating
      await addUserRating(user, userProfile[0].userId, starValue || 1);
      // await addBuyerRating();
      await addListingToRate(
        user,
        userProfile[0].userId,
        listingData.listingId,
        listingData.creationTime,
      );
      toast(`Successfully Marked Listing as Sold`);
    } else {
      toast(`No Such User as ${buyerName} found. Try again!`);
    }
    setShow(false);
    if (setReload) setReload(true);
    if (closeListing) closeListing(false);
    // userProfile.savedListings.map((listing) => {
    //     console.log(listing[0]);
    //     ids.push(listing[0]);
    //     creations.push(listing[1]);
    // });
  };
  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg" dialogClassName={styles.soldDialog}>
      <h1 className="mx-auto text-center">Rate Buyer</h1>
      <Form className="text-center">
        <h4 className="mx-auto">{title}</h4>
        <Form.Row className="justify-content-center">
          <Form.Group as={Col} className="text-center">
            <Form.Control
              placeholder="Enter Buyer Name"
              className={styles.input}
              required
              onChange={(e) => {
                setBuyerName(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row className="justify-content-center">
          <Form.Group as={Col} className="text-center">
            <Form.Label className={styles.text}>Rate Buyer</Form.Label>
          </Form.Group>
        </Form.Row>

        <Rating
          name="simple-controlled"
          value={starValue}
          onChange={(event, newValue) => {
            setStarValue(newValue);
          }}
        />

        <Form.Row className="justify-content-center">
          <Button
            className={styles.button}
            onClick={() => {
              if (buyerName.length !== 0) {
                callAPI();
              } else {
                toast('No Buyer Name Entered. Try Again.');
              }
            }}
          >
            Mark as Sold
          </Button>
        </Form.Row>
      </Form>
    </Modal>
  );
};

export default connect()(RateBuyer);
