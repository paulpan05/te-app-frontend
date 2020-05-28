import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authActions } from '../../redux/actions';
import { rootState } from '../../redux/reducers';
import { getUserProfile, userSignup } from '../../api';

interface HomeProps {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const Home: React.FC<HomeProps> = ({ dispatch, user }) => (
  <>
    <button
      onClick={() => {
        dispatch(authActions.signOut());
      }}
      type="submit"
    >
      Sign Out
    </button>
    <button
      onClick={async () => {
        await userSignup(user);
      }}
      type="submit"
    >
      Sample Fetch
    </button>
    <button
      type="submit"
      onClick={async () => {
        await getUserProfile(user);
      }}
    >
      Sample User
    </button>
  </>
);

export default connect(mapStateToProps)(Home);
