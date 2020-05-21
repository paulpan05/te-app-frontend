/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import { rootState } from '../../redux/reducers';
import styles from './index.module.scss';
import item from '../../assets/img/item.png';
import exit from '../../assets/img/exit.png';
import comment from '../../assets/img/comment.png';
import deleteImg from '../../assets/img/delete.png';
import heart from '../../assets/img/heart.png';
import DeletePopup from '../deletePopup';

interface EditListingProps extends Omit<RouteProps, 'render'> {
  showPopup: boolean;
  setter: React.Dispatch<any>;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const EditListing: React.FC<EditListingProps> = ({ showPopup, setter }) => {
  const [showDelete, setshowDelete] = React.useState(false);
  return (
    <div>
      <DeletePopup showPopup={showDelete} setter={setshowDelete} />
      <div>
        <Modal
          show={showPopup}
          onHide={() => setter(false)}
          dialogClassName={styles.listingModal}
          backdropOpacity={1}
          size="xl"
        >
          <Row style={{ maxHeight: '100%' }} className="no-gutters">
            <Card className={styles.myCard}>
              <Row className={styles.pad}>
                <Col xs={4} className={styles.textAlign}>
                  <img className={styles.listingPicture} src={item} alt="Item" />
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
                    A French terry sweatshirt featuring an embroidered graphic of a yellow
                    sunflower, long dropped sleeves, a crew neck, and hood. Purchased from Forever
                    21 - Original Price $35 - 60% cotton, 40% polyester - Machine wash cold
                  </p>
                </Col>
                <Col xs={1}>
                  <button
                    type="button"
                    onClick={() => setter(false)}
                    onKeyDown={() => setter(false)}
                    className={styles.myButton}
                  >
                    <img className={styles.exit} src={exit} alt="Exit" />
                  </button>
                </Col>
              </Row>
              <Row className={styles.pad}>
                <Col className={styles.sellerProfile}>
                  <div>
                    <h1 className={styles.listingTitle}>Comments</h1>
                    <p>Beautiful sweatshirt!</p>
                    <p>Interested</p>
                  </div>
                  <div className="mt-auto">
                    <input type="text" value="Write a comment" className={styles.sellerButton} />
                  </div>
                </Col>
                <Col xs={2} className={styles.textAlign}>
                  <div className={styles.images}>
                    <img src={heart} alt="Like" />
                    <img src={comment} alt="Comment" />
                    <button
                      type="button"
                      onClick={() => setshowDelete(true)}
                      onKeyDown={() => setshowDelete(true)}
                      className={styles.myButton}
                    >
                      <img src={deleteImg} alt="Delete" />
                    </button>
                  </div>
                </Col>
                <Col className={styles.sellerProfile}>
                  <div>
                    <div className={styles.interestBox}>
                      <p>54 Customers Interested</p>
                    </div>
                    <div>
                      <button type="button" className={styles.sellerButton}>
                        Mark as Sold
                      </button>
                      <button type="button" className={styles.sellerButton}>
                        Edit Listing
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Row>
        </Modal>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(EditListing);
