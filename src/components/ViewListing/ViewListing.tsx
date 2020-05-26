import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
//import StarRatings from 'react-star-ratings';
import Card from 'react-bootstrap/Card';
import styles from './listing.module.scss';
// import ProfileImg from '../../assets/Profile.png';
// import FlowerImg from '../../assets/GreenShirt.png';
import FlowerImg from '../../assets/img/books.jpg';
import ProfileImg from '../../assets/img/sarah.png';
import CommentBox from '../CommentBox';
import ReportListing from '../ReportModals/ReportListing';

interface ViewListingProps {
  dispatch: Dispatch<any>;
  show: boolean;
  setShow: Function;
  title: string;
  seller: string;
}
const ViewListing: React.FC<ViewListingProps> = ({ dispatch, show, setShow, title, seller }) => {
  const [showReportListing, setShowReportListing] = useState(false);
  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl">
      <Row style={{ maxHeight: '100%' }} className="no-gutters">
        <Card className={styles.myCard}>
          <Row className={styles.pad}>
            <Col xs={4} className={styles.textAlign}>
              <img className={styles.listingPicture} src={FlowerImg} alt="Item" />
            </Col>
            <Col>
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
                <img className={styles.exit} alt="Exit" />
              </button>
            </Col>
          </Row>
          <Row className={styles.pad}>
            <Col className={styles.sellerProfile}>
              <CommentBox data={[]}></CommentBox>
            </Col>
            <Col xs={2} className={styles.textAlign}>
              <div className={styles.images}>
                <img alt="Like" />
                <img alt="Comment" />
                <img alt="Flag" />
                <ReportListing show={showReportListing} setShow={() => setShowReportListing(true)}/>
              </div>
            </Col>
            <Col className={styles.sellerProfile}>
              <div>
                <div>
                  <img src={ProfileImg} className={styles.sellerPicture} alt="Seller" />
                </div>
                <div>
                  <p>Sarah A.</p>
                  <p>0 Stars</p>
                </div>
                <div>
                  <button type="button" className={styles.sellerButton}>
                    Contact Seller
                  </button>
                  <button type="button" className={styles.sellerButton}>
                    View Profile
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Row>
    </Modal>
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
