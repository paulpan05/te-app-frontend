/** This file is for the popup when a user click's 'Contact Seller' on a listing modal. It is sent the
 * object of the listing and the seller profile.
 */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { Modal, Row, Card, Col } from 'react-bootstrap';
import { rootState } from '../../redux/reducers';
import styles from './index.module.scss';

interface ContactSellerProps extends Omit<RouteProps, 'render'> {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
  showPopup: boolean;
  setter: React.Dispatch<any>;
  sellerInfo: any;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const ContactSeller: React.FC<ContactSellerProps> = ({ showPopup, setter, sellerInfo }) => {
  return (
    <div className="textAlign">
      <div>
        <Modal show={showPopup} onHide={() => setter(false)}>
          <Row className={styles.margin50}>
            <Card className={styles.deleteCard}>
              <Row className={styles.pad}>
                <Col className="popup blueColor">
                  <p className="subHeader">
                    Contact&nbsp;
                    {sellerInfo.name}
                  </p>
                  <p className="bodyText">
                    Email:&nbsp;
                    {sellerInfo.email}
                  </p>
                  <p className="bodyText">
                    Phone Number:&nbsp;
                    {sellerInfo.phone}
                  </p>
                </Col>
              </Row>
            </Card>
          </Row>
        </Modal>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(ContactSeller);
