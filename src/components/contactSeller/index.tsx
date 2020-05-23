/* eslint-disable react/jsx-props-no-spreading */
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
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const ContactSeller: React.FC<ContactSellerProps> = ({ showPopup, setter }) => {
  return (
    <div>
      <div>
        <Modal show={showPopup} onHide={() => setter(false)}>
          <Row className={styles.margin50}>
            <Card className={styles.deleteCard}>
              <Row className={styles.pad}>
                <Col className={styles.popup}>
                  <p className={styles.popupHeader}>Contact Sarah A.</p>
                  <p className={styles.popupSubtext}>
                    Email:&nbsp;
                    <a
                      className={styles.popupSubtext}
                      href="mailto:no-one@snai1mai1.com?subject=Interested in 'listing item name'&body=Hi, I saw your listing for 'name' on Triton Exchange."
                    >
                      sarah@ucsd.edu
                    </a>
                  </p>
                  <p className={styles.popupSubtext}>Phone Number: (000) 000-0000</p>
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
