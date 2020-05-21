import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authActions, modalActions } from '../../redux/actions';
import DefaultModal from '../../components/Modals';
import TestModal from '../../components/TestModal';

interface HomeProps {
  dispatch: Dispatch<any>;
}

const Home: React.FC<HomeProps> = ({ dispatch }) => (
  <div>
    <button
      onClick={() => {
        dispatch(authActions.signOut());
      }}
      type="submit"
    >
      Sign Out
    </button>
    <TestModal />
  </div>
);

export default connect()(Home);
