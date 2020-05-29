/*eslint-disable*/

/** This file is for the popup when you click a listing. Has props for stored listing object and seller profile
 */
/*NEEDS: star rating, pictures*/
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import StarRatings from 'react-star-ratings';
import Card from 'react-bootstrap/Card';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './listing.module.scss';
import FlowerImg from '../../assets/img/books.jpg';
import DeletePopup from '../deletePopup';
import ContactSeller from '../contactSeller';
import EditListing from '../editListing';
import CommentBox from '../CommentBox';
import { fetchListing, getSellerInfo } from '../../api/index';
import { rootState } from '../../redux/reducers';

interface ViewListingProps {
  show: boolean;
  setShow: Function;
  title: string;
  seller: string;
  user: firebase.User | null | undefined;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const ViewListing: React.FC<ViewListingProps> = ({ user, show, setShow, title, seller }) => {
  /* Popup to show the seller contact information */
  const [contactSeller, showContact] = useState(false);
  /* Popup to show listing deletion confirmation */
  const [showDelete, setshowDelete] = React.useState(false);
  /* Stores the listing object */
  const [myData, setData] = useState<any>(null);
  /* Stores the seller profile of the listing */
  const [sellerInfo, sellerInfoSetter] = useState<any>(null);

  const callAPI = async () => {
    /* const result1 = await fetchListing(
      user,
      setData,
      ['aa7f6878-2b29-45cc-958b-d6eb3b895485'],
      [1590713319380],
    ); */
    //gets single listing object
     const result1 = await fetchListing(
      user,
      setData,
      ['dce37862-1852-44f3-ad43-7a2109755ea0'],
      [1590700860538],
    ); 
    // gets the seller profile
    getSellerInfo(user, result1[0].userId, sellerInfoSetter);
    setData(result1);
  };
  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div>
      {myData && sellerInfo && (
        <ContactSeller showPopup={contactSeller} setter={showContact} sellerInfo={sellerInfo} />
      )}
      {myData && (
        <DeletePopup
          showPopup={showDelete}
          setter={setshowDelete}
          listingSetter={setShow}
          listingObject={myData[0]}
        />
      )}
      {myData && sellerInfo && (
        <Modal show={show} onHide={() => setShow(false)} size="xl">
          <Row style={{ maxHeight: '100%' }} className="no-gutters">
            <Card className={styles.myCard}>
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
                  <h1 className={styles.listingTitle}>{myData[0].title}</h1>
                  <p>{myData[0].location}</p>
                  <p className={styles.listingHeader}>Price</p>
                  <p className={styles.listingHeader}>Posted</p>
                  <p className={styles.listingHeader}>Pickup</p>
                  <p className={styles.listingInfo}>{myData[0].price}</p>
                  <p className={styles.listingInfo}>{myData[0].creationTime}</p>
                  <p className={styles.listingInfo}>{myData[0].location}</p>
                  <p className={styles.listingSecondaryInfo}>{myData[0].description}</p>
                </Col>
                {/* Button to close the listing modal */}
                <Col xs={1}>
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    onKeyDown={() => setShow(false)}
                    className={styles.myButton}
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" className={styles.flag} />
                  </button>
                </Col>
              </Row>
              <Row className={styles.pad} style={{ maxHeight: '100%' }}>
                {/* Comment section */}
                <Col xs={12} md={5}>
                  <CommentBox
                    user={user}
                    listingId={myData[0].listingId}
                    creationTime={myData[0].creationTime}
                    commentsData={myData[0].comments}
                  />
                </Col>
                {/* Middle and right section */}
                <EditListing
                  showDeleteSetter={setshowDelete}
                  contactSellerSetter={showContact}
                  listingObject={myData[0]}
                  sellerInfo={sellerInfo}
                />
              </Row>
            </Card>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(ViewListing);
