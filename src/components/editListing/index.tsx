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
import { ReportListing } from '../ReportModals';
import { saveListing, getUserProfile, unsaveListing, fetchListing } from '../../api/index';
import 'react-toastify/dist/ReactToastify.css';
import Profile from '../../pages/Profile/index';
interface EditListingProps extends Omit<RouteProps, 'render'> {
  showDeleteSetter: React.Dispatch<any>;
  contactSellerSetter: React.Dispatch<any>;
  user: firebase.User | null | undefined;
  listingObject: any;
  sellerInfo: any;
  setShowEditListing: Function;
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
  setShowEditListing,
}) => {
  const [markSold, markSoldSetter] = useState(false);
  const [showReportListing, setShowReportListing] = useState(false);
  const [clickedOnProfile, setClickedOnProfile] = useState(false);
  // false means not same user, true means they own the listing
  const [curId, curIdSetter] = useState(user?.uid === listingObject.userId);
  const [liked, setLiked] = useState(false);
  const [numSaved, setNumSaved] = useState(0);
  const [sellerData, sellerDataSetter] = useState();
  const [toggled, setToggled] = useState(false);
  const [myData, myDataSetter] = useState();
  const callAPI = async () => {
    const test = await getUserProfile(user, undefined, sellerDataSetter);
    if (test) {
      for (let i = 0; i < test.savedListings.length; i++) {
        if (test.savedListings[i][0] === listingObject.listingId) {
          if (test.savedListings[i][1] === listingObject.creationTime) {
            setLiked(true);
            break;
          }
        }
      }
    }
    const result = await fetchListing(
      user,
      myDataSetter,
      [listingObject.listingId],
      [listingObject.creationTime],
    );
    if (!result) {
      console.log('there was an error while fetching your listing!');
      toast(
        'There was an error while retrieving your listing details! Please try again or reload the page.',
      );
    } else {
      myDataSetter(result);
      setNumSaved(result[0].savedCount);
    }
  };
  useEffect(() => {
    /*
    const myId = user?.uid;
    // when the current user is the owner of the listing
    if (myId === listingObject.userId) {
      curIdSetter(true);
    }*/
    callAPI();
  }, [user]);
  console.log('LISTING OBJECT USER ID');
  console.log(listingObject.userId);
  return (
    /* VIEWING SOMEONE ELSE'S LISTING!!! */
    <>
      {/*{clickedOnProfile && <Redirect to="/profile" />} */}
      {!curId && myData && (
        <>
        {clickedOnProfile && <Redirect to={{pathname: "/profile", state: { targetUserId: listingObject.userId }}}/>}
          <ReportListing show={showReportListing} setShow={setShowReportListing} />
          <Col xs={12} md={2} className={styles.textAlign}>
            <div>
              {/* Button will save listing or remove it based on what state it is in */}

              <button
                type="button"
                onClick={async () => {
                  if (!liked) {
                    const success = await saveListing(
                      user,
                      myData[0].listingId,
                      myData[0].creationTime,
                    );
                    if (success) {
                      setNumSaved(numSaved + 1);
                      setLiked(!liked);
                      toast('This listing has been added to your Saved collection!');
                    } else {
                      toast(
                        'There has been an error while adding this to your saved collection. Please try again.',
                      );
                    }
                  } else {
                    const success = await unsaveListing(
                      user,
                      myData[0].listingId,
                      myData[0].creationTime,
                    );
                    if (success) {
                      setNumSaved(numSaved - 1);
                      setLiked(!liked);
                      toast('This listing has been removed from your Saved collection!');
                    } else {
                      toast(
                        'There has been an error while removing this from your saved collection. Please try again.',
                      );
                    }
                  }
                }}
                className={styles.myButton}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  size="lg"
                  className={liked ? styles.likedFlag : styles.flag}
                />
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
              <p>{sellerInfo.ratings}</p>

              {/* Seller popup needs to be implemented to get seller data */}
              <button
                type="button"
                onClick={() => contactSellerSetter(true)}
                className={styles.sellerButton}
              >
                Contact Seller
              </button>
              <div className={styles.interestBox}>
                <p>{numSaved} people have this item saved!</p>
              </div>
            </div>
          </Col>
        </>
      )}
      {/* THIS IS FOR VIEWING YOUR OWN LISTING!!!*/}
      {curId && myData && (
        <>
          <RateBuyer show={markSold} setShow={markSoldSetter} title="Flower Sweatshirt" />
          <Col xs={12} md={2} className={styles.textAlign}>
            <div className={styles.centerRow}>
              {/* Button will save listing or remove it based on what state it is in */}

              <button
                type="button"
                onClick={async () => {
                  if (!liked) {
                    const success = await saveListing(
                      user,
                      myData[0].listingId,
                      myData[0].creationTime,
                    );
                    if (success === true) {
                      setNumSaved(numSaved + 1);
                      setLiked(!liked);
                      toast('This listing has been added to your Saved collection!');
                    } else {
                      toast(
                        'There has been an error while adding this to your saved collection. Please try again.',
                      );
                    }
                  } else {
                    const success = await unsaveListing(
                      user,
                      myData[0].listingId,
                      myData[0].creationTime,
                    );
                    if (success === true) {
                      setNumSaved(numSaved - 1);
                      setLiked(!liked);
                      toast('This listing has been removed from your Saved collection!');
                    } else {
                      toast(
                        'There has been an error while removing this from your saved collection. Please try again.',
                      );
                    }
                  }
                }}
                className={styles.myButton}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  size="lg"
                  className={liked ? styles.likedFlag : styles.flag}
                />
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
              <button
                type="button"
                className={styles.myButton}
                onClick={() => setClickedOnProfile(true)}
              >
                <img src={ProfileImg} className={styles.sellerPicture} alt="Seller" />
              </button>
              {sellerInfo && <p>{sellerInfo.name}</p>}
              <p>{sellerInfo.ratings}</p>
              <div className={styles.interestBox}>
                <p>{numSaved} people have this item saved!</p>
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
                <button type="button" className={styles.sellerButton} onClick={() => {
                  setShowEditListing(true);
                }}>
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
