import React, { useState } from 'react';
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
import styles from './listing.module.scss';
import FlowerImg from '../../assets/img/books.jpg';
import { authActions } from '../../redux/actions';
import DeletePopup from '../deletePopup';
import SharePopup from '../sharePopup';
import ContactSeller from '../contactSeller';
import EditListing from '../editListing';

interface ViewListingProps {
  dispatch: Dispatch<any>;
  show: boolean;
  setShow: Function;
  title: string;
  seller: string;
}
const ViewListing: React.FC<ViewListingProps> = ({ dispatch, show, setShow, title, seller }) => {
  const [redirect, redirectTo] = useState('/');
  const [sharePopup, showShare] = useState(false);
  const [contactSeller, showContact] = useState(false);
  const [showDelete, setshowDelete] = React.useState(false);

  return (
    <div>
      <SharePopup showPopup={sharePopup} setter={showShare} />
      <ContactSeller showPopup={contactSeller} setter={showContact} />
      <DeletePopup showPopup={showDelete} setter={setshowDelete} />
      <Modal show={show} onHide={() => setShow(false)} size="xl" opacity={1}>
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
                <h1 className={styles.listingTitle}>Flower Sweatshirt</h1>
                <p className={styles.listingHeader}>Price</p>
                <p className={styles.listingHeader}>Posted</p>
                <p className={styles.listingHeader}>Pickup</p>
                <p className={styles.listingInfo}>$15</p>
                <p className={styles.listingInfo}>April 2020</p>
                <p className={styles.listingInfo}>Price Center</p>
                <p className={styles.listingSecondaryInfo}>
                  A French terry sweatshirt featuring an embroidered graphic of a yellow sunflower,
                  long dropped sleeves, a crew neck, and hood. Purchased from Forever 21 - Original
                  Price $35 - 60% cotton, 40% polyester - Machine wash cold
                </p>
              </Col>
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
              <Col md={5}>
                <div className={styles.sellerProfile}>
                  <h1 className={styles.listingTitle}>Comments</h1>
                  <p>Beautiful sweatshirt!</p>
                  <p>Interested</p>

                  <div className="mt-auto">
                    <input type="text" value="Write a comment" className={styles.sellerButton} />
                  </div>
                </div>
              </Col>
              <EditListing
                showDeleteSetter={setshowDelete}
                sharePopupSetter={showShare}
                contactSellerSetter={showContact}
                redirectSetter={redirectTo}
              />
            </Row>
          </Card>
        </Row>
        <Redirect to={redirect} />
      </Modal>
    </div>
  );
};
export default connect()(ViewListing);

{
  /* <h1 className="mx-auto text-center">Recent Purchase!</h1>
<Form className="text-center">
  <h3 className="mx-auto">{title}</h3>
  <img className={styles.profilePicture} src={ProfileImg}></img>
  <h4 className="mx-auto">Sold By: {seller}</h4>
  <Form.Row className="justify-content-center">
    <Form.Group as={Col} md="auto" className="text-center">
      <Form.Label className={styles.text}>Rate Seller</Form.Label>
    </Form.Group>
  </Form.Row>
  <StarRatings
  rating={2.403}
  starRatedColor="#FDCC0D"
  starDimension="40px"
  starSpacing="15px"
  className={styles.rating}
  />
  <Form.Row className="justify-content-center">
    <Form.Group as={Col} md="6" className="text-center">
      <Form.Label className={`${styles.text} ${styles.comments}`}>Comments?</Form.Label>
      <Form.Control as="textarea" rows={4} placeholder="Comment..." className={styles.textarea} />
    </Form.Group>
  </Form.Row>
  <Form.Row className="justify-content-center">
    <Button type="submit" className={styles.button} onClick={() => {
      // POST goes here
    }}>Mark as Sold</Button>
  </Form.Row>
</Form> */
}
