/* eslint-disable react/jsx-props-no-spreading */
/* FILE NOT IN USE ANYMORE */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import { rootState } from '../../redux/reducers';
import styles from './index.module.scss';
import item from '../../assets/img/item.png';
import sarah from '../../assets/img/sarah.png';
import exit from '../../assets/img/exit.png';
import comment from '../../assets/img/comment.png';
import flag from '../../assets/img/flag.png';
import heart from '../../assets/img/heart.png';

interface OpenPopupProps extends Omit<RouteProps, 'render'> {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
  showPopup: boolean;
  setter: React.Dispatch<any>;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const OpenPopup: React.FC<OpenPopupProps> = ({ showPopup, setter }) => {
  return (
    <div>
      <div>
        <Modal
          show={showPopup}
          onHide={() => setter(false)}
          dialogClassName={styles.listingModal}
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
                    <img src={flag} alt="Flag" />
                  </div>
                </Col>
                <Col className={styles.sellerProfile}>
                  <div>
                    <div>
                      <img src={sarah} className={styles.sellerPicture} alt="Seller" />
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
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(OpenPopup);
