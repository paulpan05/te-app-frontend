/** This file is NOT for editing a listing (sorry). This file contains the different listing
 * modals when a user views their own listing vs someone elses. Compares the current user to the user of the listing.
 * Has all the button functionality for a listing.
 */
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
import { ReportListing } from '../ReportModals';
import { saveListing } from '../../api/index';

interface EditListingProps extends Omit<RouteProps, 'render'> {
  showDeleteSetter: React.Dispatch<any>;
  contactSellerSetter: React.Dispatch<any>;
  user: firebase.User | null | undefined;
  listingObject: any;
  sellerInfo: any;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const EditListing: React.FC<EditListingProps> = ({
  user,
  showDeleteSetter,
  contactSellerSetter,
  listingObject,
  sellerInfo,
}) => {
  const [markSold, markSoldSetter] = useState(false);
  const [showReportListing, setShowReportListing] = useState(false);
  const [clickedOnProfile, setClickedOnProfile] = useState(false);
  // false means not same user, true means they own the listing
  const [curId, curIdSetter] = useState();
  useEffect(() => {
    const myId = user?.uid;
    // when the current user is the owner of the listing
    if (myId === listingObject.userId) {
      curIdSetter(true);
    }
  }, [listingObject.userId, user]);
  return (
    /* this is for someone viewing some elses listing */
    <>
      {!curId && (
        <>
          {clickedOnProfile ? <Redirect to="/profile" /> : null}
          <ReportListing show={showReportListing} setShow={setShowReportListing} />
          <Col xs={12} md={2} className={styles.textAlign}>
            <div>
              {/* Button needs to have function to save item for later */}
              <button
                type="button"
                onClick={async () => {
                  const success = await saveListing(
                    user,
                    listingObject.listingId,
                    listingObject.creationTime,
                  );
                  if (success) {
                    toast('This listing has been added to your Saved collection!');
                  } else {
                    toast(
                      'There has been an error while adding this to your saved collection. Please try again.',
                    );
                  }
                }}
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
              {sellerInfo && <p>{sellerInfo.name}</p>}
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
                <p>
{listingObject.savedCount} people have this item saved!</p>
              </div>
            </div>
          </Col>
        </>
      )}
      {/* This is for someone viewing their OWN listing */}
      {curId && (
        <>
          <RateBuyer show={markSold} setShow={markSoldSetter} title="Flower Sweatshirt" />
          <Col xs={12} md={2} className={styles.textAlign}>
            <div className={styles.centerRow}>
              {/* Button needs to have function to save item for later */}
              <button
                type="button"
                onClick={async () => {
                  const success = await saveListing(
                    user,
                    listingObject.listingId,
                    listingObject.creationTime,
                  );
                  if (success) {
                    toast('This listing has been added to your Saved collection!');
                  } else {
                    toast(
                      'There has been an error while adding this to your saved collection. Please try again.',
                    );
                  }
                }}
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
              <button
                type="button"
                onClick={() => showDeleteSetter(true)}
                className={styles.myButton}
              >
                <FontAwesomeIcon icon={faTrashAlt} size="lg" className={styles.flag} />
              </button>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <div className={styles.sellerProfile}>
              <div className={styles.interestBox}>
                <p>
{listingObject.savedCount} people have this item saved!</p>
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
      )}
    </>
  );
};

export default connect(mapStateToProps)(EditListing);
