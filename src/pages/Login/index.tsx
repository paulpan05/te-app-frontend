import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Redirect } from 'react-router-dom';
import { authActions } from '../../redux/actions';
import { rootState } from '../../redux/reducers';
import styles from './index.module.scss';
import AppLogo from '../../assets/img/full-app-logo.svg';

interface LoginProps {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
  loggingIn: boolean;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
  loggingIn: state.auth.loggingIn,
});

const Login: React.FC<LoginProps> = ({ dispatch, user, loggingIn }) =>
  user ? (
    <Redirect to="/signup" />
  ) : (
    <div className={styles.background}>
      <div className={styles.authContainer}>
        <div>
          <img src={AppLogo} alt="Full App Logo" draggable={false} />
          <button
            onClick={() => {
              dispatch(authActions.logIn());
            }}
            type="submit"
            disabled={loggingIn}
          >
            Log In with UCSD SSO
          </button>
        </div>
      </div>
      <div className={styles.aboutContainer} />
    </div>
  );

export default connect(mapStateToProps)(Login);
