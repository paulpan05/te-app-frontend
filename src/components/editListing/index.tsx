/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
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
import { ReportListing } from '../ReportModals';

interface EditListingProps extends Omit<RouteProps, 'render'> {
  showDeleteSetter: React.Dispatch<any>;
  sharePopupSetter: React.Dispatch<any>;
  contactSellerSetter: React.Dispatch<any>;
  user: firebase.User | null | undefined;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const EditListing: React.FC<EditListingProps> = ({
  user,
  showDeleteSetter,
  sharePopupSetter,
  contactSellerSetter,
}) => {
  /* Temporary: using test boolean to either return guest or seller viewing a listing
  Need to implement it to check if the user matches the seller of the listing */

  const [test, testSet] = useState(false);
  const [markSold, markSoldSetter] = useState(false);
  const [showReportListing, setShowReportListing] = useState(false);
  const [clickedOnProfile, setClickedOnProfile] = useState(false);

  return test ? (
    /* SELLER VIEW */
    <>
      <RateBuyer show={markSold} setShow={markSoldSetter} title="Flower Sweatshirt" />
      <Col xs={12} md={2} className={styles.textAlign}>
        <div className={styles.centerRow}>
          {/* Button needs to have function to save item for later */}
          <button
            type="button"
            onClick={() => toast('This listing has been added to your Saved collection!')}
            className={styles.myButton}
          >
            <FontAwesomeIcon icon={faHeart} size="lg" className={styles.flag} />
          </button>
          {/* Button needs to have function to copy link to clipboard */}
          <button
            type="button"
            onClick={() => toast('This listing has been saved to your clipboard!')}
            className={styles.myButton}
          >
            <FontAwesomeIcon icon={faLink} size="lg" className={styles.flag} />
          </button>
          {/* Button needs to have function to delete listing */}
          <button type="button" onClick={() => showDeleteSetter(true)} className={styles.myButton}>
            <FontAwesomeIcon icon={faTrashAlt} size="lg" className={styles.flag} />
          </button>
        </div>
      </Col>
      <Col xs={12} md={5}>
        <div className={styles.sellerProfile}>
          <div className={styles.interestBox}>
            <p>54 Customers Interested</p>
          </div>
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
            <button type="button" className={styles.sellerButton}>
              Edit Listing
            </button>
          </div>
        </div>
      </Col>
    </>
  ) : (
    /* BUYER VIEW */
    <>
      {clickedOnProfile ? <Redirect to="/profile" /> : null}
      <ReportListing show={showReportListing} setShow={setShowReportListing} />
      <Col xs={12} md={2} className={styles.textAlign}>
        <div>
          {/* Button needs to have function to save item for later */}
          <button
            type="button"
            onClick={() => toast('This listing has been added to your Saved collection!')}
            className={styles.myButton}
          >
            <FontAwesomeIcon icon={faHeart} size="lg" className={styles.flag} />
          </button>
          {/* Button needs to have function to copy item link to clipboard */}
          <button
            type="button"
            onClick={() => toast('This listing has been saved to your clipboard!')}
            className={styles.myButton}
          >
            <FontAwesomeIcon icon={faLink} size="lg" className={styles.flag} />
          </button>
          {/* Button needs to have function to flag item */}
          <button
            type="button"
            onClick={() => setShowReportListing(true)}
            onKeyDown={() => setShowReportListing(true)}
            className={styles.myButton}
          >
            <FontAwesomeIcon icon={faFlag} size="lg" className={styles.flag} />
          </button>
        </div>
      </Col>
      <Col xs={12} md={5}>
        <div className={styles.sellerProfile}>
          <button
            type="button"
            className={styles.myButton}
            onClick={() => setClickedOnProfile(true)}
          >
            <img src={ProfileImg} className={styles.sellerPicture} alt="Seller" />
          </button>

          <p>Sarah A.</p>
          <p>0 Stars</p>

          {/* Seller popup needs to be implemented to get seller data */}
          <button
            type="button"
            onClick={() => contactSellerSetter(true)}
            onKeyDown={() => contactSellerSetter(true)}
            className={styles.sellerButton}
          >
            Contact Seller
          </button>
          <div className={styles.interestBox}>
            <p>54 Customers Interested</p>
          </div>
        </div>
      </Col>
    </>
  );
};

export default connect(mapStateToProps)(EditListing);
