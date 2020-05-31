/** This file is NOT for editing a listing (sorry). This file contains the different listing
 * modals when a user views their own listing vs someone elses. Compares the current user to the user of the listing.
 * Has all the button functionality for a listing.
 */
/*eslint-disable*/
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteProps, Redirect } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faHeart, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { rootState } from '../../redux/reducers';
import styles from './index.module.scss';
import ProfileImg from '../../assets/img/sarah.png';
import RateBuyer from '../RateBuyer';
import { saveListing, getUserProfile, unsaveListing, fetchListing } from '../../api/index';
import 'react-toastify/dist/ReactToastify.css';
import Profile from '../../pages/Profile/index';
import Button from 'react-bootstrap/Button';

interface SellerInfoProps extends Omit<RouteProps, 'render'> {
  showDeleteSetter: React.Dispatch<any>;
  contactSellerSetter: React.Dispatch<any>;
  user: firebase.User | null | undefined;
  listingObject: any;
  sellerInfo: any;
  setShowEditListing: Function;
  isUsersListing: boolean,
  numSaved: number,
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const SellerInfo: React.FC<SellerInfoProps> = ({
  user,
  showDeleteSetter,
  contactSellerSetter,
  listingObject,
  sellerInfo,
  setShowEditListing,
  isUsersListing,
}) => {
  const [markSold, markSoldSetter] = useState(false);
  const [showReportListing, setShowReportListing] = useState(false);
  const [clickedOnProfile, setClickedOnProfile] = useState(false);
  // false means not same user, true means they own the listing
  const [toggled, setToggled] = useState(false);

  return (isUsersListing) ? (
    <>
      <RateBuyer user={user} listingData={listingObject} sellerInfo={sellerInfo} title={listingObject.title} show={markSold} setShow={markSoldSetter} />
      <div>
        {/* Button needs to have function to mark item as sold */}
        <button
            type="button"
            onClick={() => markSoldSetter(true)}
            className={styles.sellerButton}
          >
            Mark as Sold
        </button>
        {/* Button needs to have function to edit listing */}
        <button type="button" className={styles.sellerButton} onClick={() => {
            setShowEditListing(true);
          }}>
          Edit Listing
        </button>
      </div>
    </>
  ) : (
    /* VIEWING SOMEONE ELSE'S LISTING!!! */
    <div className={styles.sellerProfile}>
      <button
        type="button"
        className={styles.myButton}
        onClick={() => setClickedOnProfile(true)}
      >
        <img src={ProfileImg} className={styles.sellerPicture} alt="Seller" />
      </button>
      {sellerInfo && <p>{sellerInfo.name}</p>}
      <p>{sellerInfo.ratings}</p>

      {/* Seller popup needs to be implemented to get seller data */}
      <button
        type="button"
        onClick={() => contactSellerSetter(true)}
        className={styles.sellerButton}
      >
        Contact Seller
      </button>
    </div>
  );
};
export default connect(mapStateToProps)(SellerInfo);
