import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authActions } from '../../redux/actions';

interface HomeProps {
  dispatch: Dispatch<any>;
}

const Home: React.FC<HomeProps> = ({ dispatch }) => (
  <button
    onClick={() => {
      dispatch(authActions.signOut());
    }}
    type="submit"
  >
    Sign Out
  </button>
);

export default connect()(Home);
