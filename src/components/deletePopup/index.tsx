/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
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
          dialogClassName={styles.listingModal}
          backdropOpacity={1}
        >
          <p>hello test</p>
        </Modal>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(DeletePopup);
