/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { Modal, Row, Card, Col } from 'react-bootstrap';
import { rootState } from '../../redux/reducers';
import styles from './index.module.scss';

interface DeletePopupProps extends Omit<RouteProps, 'render'> {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
  showPopup: boolean;
  setter: React.Dispatch<any>;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const DeletePopup: React.FC<DeletePopupProps> = ({ showPopup, setter }) => {
  return (
    <div>
      <div>
        <Modal
          show={showPopup}
          onHide={() => setter(false)}
          dialogClassName={styles.deleteModal}
          backdropOpacity={1}
        >
          <Row className={styles.margin50}>
            <Card className={styles.deleteCard}>
              <Row className={styles.pad}>
                <Col className={styles.sellerProfile}>
                  <div>
                    <h1 className={styles.listingTitle}>Are you sure you want to delete?</h1>
                  </div>
                  <div className="mt-auto">
                    <input type="text" value="Yes" className={styles.sellerButton} />
                  </div>
                  <div className="mt-auto">
                    <input type="text" value="No" className={styles.sellerButton} />
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

export default connect(mapStateToProps)(DeletePopup);
