/** This file is for the popup when you click to delete your listing. Confirms or denies action
 * and calls API to remove listing from database
 */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { Modal, Row, Card, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { rootState } from '../../redux/reducers';
import styles from './index.module.scss';
import { deleteListing } from '../../api/index';

interface DeletePopupProps extends Omit<RouteProps, 'render'> {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
  showPopup: boolean;
  setter: React.Dispatch<any>;
  listingSetter: Function;
  listingObject: any;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const DeletePopup: React.FC<DeletePopupProps> = ({
  user,
  showPopup,
  setter,
  listingSetter,
  listingObject,
}) => {
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
                      onClick={async () => {
                        const success = await deleteListing(
                          user,
                          listingObject.listingId,
                          listingObject.creationTime,
                          true,
                        );
                        if (success) {
                          setter(false);
                          listingSetter(false);
                          toast('This listing has been deleted!');
                        } else {
                          toast(
                            'There has been an error while deleting this listing. Please try again.',
                          );
                        }
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
