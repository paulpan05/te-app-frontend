/*eslint-disable*/

/** This file is for the popup when you click a listing. Has props for stored listing object and seller profile
 */
/*NEEDS: star rating, pictures*/
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Carousel, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import StarRatings from 'react-star-ratings';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFlag, faHeart, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './listing.module.scss';
import FlowerImg from '../../assets/img/books.jpg';
import DeletePopup from '../DeletePopup/index';
import ContactSeller from '../ContactSeller/index';
import SellerInfo from '../SellerInfo';
import CommentBox from '../CommentBox';
import ActualEditListing from '../EditListing(actual)/index';
import { fetchListing, saveListing, unsaveListing, getUserProfile } from '../../api/index';
import { rootState } from '../../redux/reducers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReportListing } from '../ReportModals';
import ProfileImg from '../../assets/img/sarah.png';
import Profile from '../../pages/Profile/index';

interface ViewListingProps {
  show: boolean;
  setShow: Function;
  user: firebase.User | null | undefined;
  listingId: string;
  creationTime: number;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const ViewListing: React.FC<ViewListingProps> = ({
  user,
  show,
  setShow,
  listingId,
  creationTime,
}) => {
  /* Popup to show the seller contact information */
  const [contactSeller, contactSellerSetter] = useState(false);
  /* Popup to show listing deletion confirmation */
  const [showDelete, setshowDelete] = React.useState(false);
  /* Stores the listing object */
  const [listingData, setData] = useState<any>(null);
  // listingData: userId, title, price, description, location, pictures TODO 
  const [numSaved, setNumSaved] = useState(0);
  /* Stores the seller profile of the listing */
  const [sellerInfo, sellerInfoSetter] = useState<any>(null);
  /* Popup to show edit listing */
  const [showEditListing, setShowEditListing] = useState(false);
  const [showReportListing, setShowReportListing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isUsersListing, setIsUsersListing] = useState<any>();
  const [clickedOnProfile, setClickedOnProfile] = useState(false);
  const [markSold, markSoldSetter] = useState(false);

  useEffect(() => {
    const fetchListingData = async () => {
      //gets single listing object
      const result = await fetchListing(user, setData, [listingId], [creationTime]);

      if (result) {
        // gets the seller profile
        const resultData = result[0];
        setData(resultData);
        getUserProfile(user, resultData.userId, sellerInfoSetter);
        if (user?.uid === resultData.userId) {
          setIsUsersListing(true);
        }
        setNumSaved(resultData.savedCount);
        const userProfileResult = await getUserProfile(user);
        if (userProfileResult) {
          for (let savedListing of userProfileResult.savedListings) {
            const sListingId = savedListing[0];
            const sCreationTime = savedListing[1];
            if (sListingId === listingId && sCreationTime === creationTime) {
                setLiked(true);
                break;
            }
          }
        }
      } else {
        console.log('There was an error while fetching your listing!');
        toast(
          'There was an error while retrieving your listing details! Please try again or reload the page.',
        );
      }
    };
    
    fetchListingData();
  }, []);

  return clickedOnProfile ? (
    <>
      <Modal show={clickedOnProfile} onHide={() => setClickedOnProfile(false)} size="xl">
      <Container style={{ maxHeight: '50%' }} className="no-gutters">
        <Card className="myCard">
          <Profile targetUserId={listingData.userId} />
        </Card>
      </Container>
      </Modal>
    </>
  ) :
  (
    listingData &&
    <div>
      {showEditListing && (
        <ActualEditListing
          showDeleteSetter={setshowDelete}
          show={showEditListing}
          setShow={setShowEditListing}
          listingId={listingId}
          creationTime={creationTime}
          titleProp={listingData.title}
          priceProp={listingData.price}
          descriptionProp={listingData.description}
          locationProp={listingData.location}
          tagsProp={listingData.tags}
          picturesProp={listingData.pictures}
        />
      )}

      <DeletePopup
        showPopup={showDelete}
        setter={setshowDelete}
        listingSetter={setShow}
        listingObject={listingData}
      />

      {sellerInfo && <ReportListing
        show={showReportListing}
        setShow={setShowReportListing}
        listingId={listingId}
        reportedUserName={sellerInfo.name}
        reportedListingName={listingData.title}
      />}

      {sellerInfo && (
        <ContactSeller showPopup={contactSeller} setter={contactSellerSetter} sellerInfo={sellerInfo} />
      )}

      {sellerInfo && (
        <Modal show={show} onHide={() => setShow(false)} size="xl" className="responsiveModal">
          <Row style={{ maxHeight: '100%' }} className="no-gutters">
            <Card className="myCard">
              <Row className={styles.pad}>
                <Col xs={12} md={4} className={styles.textAlign}>
                  <Carousel interval={null}>
                    <Carousel.Item>
                      <img className={styles.listingPicture} src={FlowerImg} alt="Item" />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img className={styles.listingPicture} src={FlowerImg} alt="Item" />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img className={styles.listingPicture} src={FlowerImg} alt="Item" />
                    </Carousel.Item>
                  </Carousel>
                </Col>
                <Col xs={12} md={7} className={styles.textAlign}>
                  <h1 className={styles.listingTitle}>{listingData.title}</h1>
                  <p>{listingData.location}</p>
                  <p className={styles.listingHeader}>Price</p>
                  <p className={styles.listingHeader}>Posted</p>
                  <p className={styles.listingHeader}>Pickup</p>
                  <p className={styles.listingInfo}>${listingData.price}</p>
                  <p className={styles.listingInfo}>
                    {new Date(creationTime).toDateString()}
                  </p>
                  <p className={styles.listingInfo}>{listingData.location}</p>
                  <p className={styles.listingSecondaryInfo}>{listingData.description}</p>
                </Col>
                {/* Button to close the listing modal */}
                <Col xs={1}>
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    onKeyDown={() => setShow(false)}
                    className="exitButton"
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" className={styles.exitFlag} />
                  </button>
                </Col>
              </Row>
              <Row className={styles.pad} style={{ maxHeight: '100%' }}>
                {/* Comment section */}
                <Col xs={12} md={5}>
                  <CommentBox
                    user={user}
                    listingId={listingId}
                    creationTime={creationTime}
                    commentsData={listingData.comments}
                  />
                </Col>
                {/* Middle button section */}
                <Col xs={12} md={2} className={styles.textAlign}>
                  <div>
                    {/* Button will save listing or remove it based on what state it is in */}
                    {!isUsersListing && (
                      <button
                        type="button"
                        onClick={async () => {
                          if (!liked) {
                            const success = await saveListing(
                              user,
                              listingId,
                              creationTime,
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
                              listingId,
                              creationTime,
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
                    )}

                    {/* Button needs to have function to copy item link to clipboard */}
                    <button
                      type="button"
                      onClick={() => {toast('This listing has been saved to your clipboard!'); navigator.clipboard.writeText(listingData.listingId)}}
                      className={styles.myButton}
                    >
                      <FontAwesomeIcon icon={faLink} size="lg" className={styles.flag} />
                    </button>

                    {/* Button needs to have function to flag item */}
                    {!isUsersListing && (
                      <button
                        type="button"
                        onClick={() => setShowReportListing(true)}
                        className={styles.myButton}
                      >
                        <FontAwesomeIcon icon={faFlag} size="lg" className={styles.flag} />
                      </button>
                    )}
                  </div>
                </Col>
                {/*Bottom right section*/}
                <Col xs={12} md={5}>
                  {/*This div displays seller picture, name, rating, #saved */}
                  <div className={styles.sellerProfile}>
                  <button
                      type="button"
                      className={styles.myButton}
                      onClick={() => setClickedOnProfile(true)}
                    >
                      <img src={ProfileImg} className={styles.sellerPicture} alt="Seller" />
                    </button>

                    <p>{sellerInfo.name}</p>
                    <p>{sellerInfo.ratings}</p>
                    <div className={styles.interestBox}>
                      <p>{numSaved} people have this item saved!</p>
                    </div>
                    {/*This displays either Mark as Sold & Edit Listing OR Contact Seller*/}
                    {isUsersListing ? 
                    (
                      <>
                        <button
                            type="button"
                            onClick={() => markSoldSetter(true)}
                            className={styles.sellerButton}
                            >
                              Mark as Sold
                          </button>
                          <button type="button" className={styles.sellerButton} onClick={() => {setShowEditListing(true);}}>
                              Edit Listing
                            </button>
                        </>
                    )
                    :       
                    (
                    <button
                    type="button"
                    onClick={() => contactSellerSetter(true)}
                    className={styles.sellerButton}
                    >
                      Contact Seller
                      </button>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(ViewListing);
