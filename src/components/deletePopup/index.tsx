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
  toast: React.Dispatch<any>;
  listingSetter: Function;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const DeletePopup: React.FC<DeletePopupProps> = ({ showPopup, setter, toast, listingSetter }) => {
  return (
    <div>
      <div>
        <Modal show={showPopup} onHide={() => setter(false)}>
          <Row className={styles.margin50}>
            <Card className={styles.deleteCard}>
              <Row className={styles.pad}>
                <Col className={styles.popup}>
                  <p className={styles.popupHeader}>
                    Are you sure you want to delete this listing?
                  </p>

                  <div className="mt-auto">
                    {/* Hides the listing and shows toast indicating listing was deleted */}
                    <button
                      type="button"
                      className={styles.sellerButton}
                      onClick={() => {
                        toast(true);
                        setter(false);
                        listingSetter(false);
                      }}
                    >
                      Yes
                    </button>
                  </div>
                  <div className="mt-auto">
                    {/* Closes delete popup */}
                    <button
                      type="button"
                      className={styles.sellerButton}
                      onClick={() => setter(false)}
                    >
                      No
                    </button>
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
