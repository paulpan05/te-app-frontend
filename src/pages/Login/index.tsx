import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authActions } from '../../redux/actions';

interface LoginProps {
  dispatch: Dispatch<any>;
}

const Login: React.FC<LoginProps> = ({ dispatch }) => (
  <button
    onClick={() => {
      dispatch(authActions.logIn());
    }}
    type="submit"
  >
    Log In
  </button>
);

export default connect()(Login);
