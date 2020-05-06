import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Redirect } from 'react-router-dom';
import { authActions } from '../../redux/actions';
import { rootState } from '../../redux/reducers';

interface LoginProps {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const Login: React.FC<LoginProps> = ({ dispatch, user }) =>
  user ? (
    <Redirect to="/" />
  ) : (
    <button
      onClick={() => {
        dispatch(authActions.logIn());
      }}
      type="submit"
    >
      Log In
    </button>
  );

export default connect(mapStateToProps)(Login);
