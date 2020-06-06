import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import RateSeller from './RateSeller';
import styles from './index.module.scss';
import { fetchListing, getUserProfile } from '../../api';

interface RateProps {
  user: firebase.User | null | undefined;
  sellerId: string;
  listingId: string;
  creationTime: number;
  reloadHome: Function;
}

const Rate: React.FC<RateProps> = ({ user, listingId, creationTime, sellerId, reloadHome }) => {
  const [show, setShow] = useState(false);
  const [listing, setListing] = useState();
  const [sellerName, setSellerName] = useState();
  const [sellerPic, setSellerPic] = useState();

  const callAPI = useCallback(async () => {
    const userProfile = await getUserProfile(user, sellerId);
    setSellerName(userProfile.name);
    setSellerPic(userProfile.picture);
    await fetchListing(user, setListing, [listingId], [creationTime]);
  }, [creationTime, listingId, sellerId, user]);

  useEffect(() => {
    callAPI();
  }, [callAPI]);
  return (
    <>
      <Alert className={styles.center} variant="info">
        <span>Recent Purchase!</span>
        <Alert.Link onClick={() => setShow(true)}> Click Here</Alert.Link>
        <span> </span>
        <span>to Rate Seller.</span>
      </Alert>
      {listing && (
        <RateSeller
          user={user}
          picture={sellerPic}
          reloadHome={reloadHome}
          sellerName={sellerName}
          listingId={listing[0].listingId}
          listingCreationTime={listing[0].creationTime}
          title={listing[0].title}
          sellerId={listing[0].userId}
          show={show}
          setShow={setShow}
        />
      )}
    </>
  );
};
export default connect()(Rate);
