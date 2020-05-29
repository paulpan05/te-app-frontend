import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Carousel } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import StarRatings from 'react-star-ratings';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import styles from './listing.module.scss';
import FlowerImg from '../../assets/img/books.jpg';
import { authActions } from '../../redux/actions';
import DeletePopup from '../deletePopup';
import SharePopup from '../sharePopup';
import ContactSeller from '../contactSeller';
import EditListing from '../editListing';
import ProfileImg from '../../assets/img/sarah.png';
import CommentBox from '../CommentBox';
import 'react-toastify/dist/ReactToastify.css';
import { fetchListing } from '../../api/index';
import { rootState } from '../../redux/reducers';
import endpoint from '../../configs/endpoint';

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
  /* Popup to show that link was saved to clipboard */
  const [sharePopup, showShare] = useState(false);
  /* Popup to show the seller contact information */
  const [contactSeller, showContact] = useState(false);
  /* Popup to show listing deletion confirmation */
  const [showDelete, setshowDelete] = React.useState(false);
  const [myData, setData] = useState<any>(null);

  useEffect(() => {
    fetchListing(user, setData, ['dce37862-1852-44f3-ad43-7a2109755ea0'], [1590700860538]);
  }, [user]);

  return (
    <div>
      <SharePopup showPopup={sharePopup} setter={showShare} />
      <ContactSeller showPopup={contactSeller} setter={showContact} />
      <DeletePopup showPopup={showDelete} setter={setshowDelete} listingSetter={setShow} />
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
                {myData && <h1 className={styles.listingTitle}>{myData[0].title}</h1>}
                {myData && <p>{myData[0].location}</p>}
                <p className={styles.listingHeader}>Price</p>
                <p className={styles.listingHeader}>Posted</p>
                <p className={styles.listingHeader}>Pickup</p>
                {myData && <p className={styles.listingInfo}>{myData[0].price}</p>}
                {myData && <p className={styles.listingInfo}>{myData[0].creationTime}</p>}
                {myData && <p className={styles.listingInfo}>{myData[0].location}</p>}
                {myData && <p className={styles.listingSecondaryInfo}>{myData[0].description}</p>}
              </Col>
              {/* This is the exit button */}
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
                {myData && (
                  <CommentBox
                    user={user}
                    listingId={myData[0].listingId}
                    creationTime={myData[0].creationTime}
                    commentsData={myData[0].comments}
                  />
                )}
              </Col>
              {/* Middle and right section */}
              {/* {myData && <p>{myData[0].userId}</p>} */}
              {myData && (
                <EditListing
                  showDeleteSetter={setshowDelete}
                  sharePopupSetter={showShare}
                  contactSellerSetter={showContact}
                  sellerId={myData[0].userId}
                  listingId="dce37862-1852-44f3-ad43-7a2109755ea0"
                  listingTime={1590700860538}
                />
              )}
            </Row>
          </Card>
        </Row>
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps)(ViewListing);
