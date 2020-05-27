import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authActions } from '../../redux/actions';
import { rootState } from '../../redux/reducers';
import endpoint from '../../configs/endpoint';

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
      onClick={() => {
        user?.getIdToken().then((result) => {
          console.log(result);
          fetch(`${endpoint}/users/signup`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${result}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phone: '12345678',
              location: 'LA',
            }),
          })
            .then((res) => res.json())
            .then((res1) => {
              console.log(res1);
            });
        });
      }}
      type="submit"
    >
      Sample Fetch
    </button>
    <button
      type="submit"
      onClick={() => {
        user?.getIdToken().then((result) => {
          fetch(`${endpoint}/users/profile`, {
            headers: {
              Authorization: `Bearer ${result}`,
            },
          })
            .then((res) => res.json())
            .then((res1) => {
              console.log(res1);
            });
        });
      }}
    >
      Sample User
    </button>
  </>
);

export default connect(mapStateToProps)(Home);
