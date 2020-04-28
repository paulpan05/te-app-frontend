import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import auth from '../../configs/firebase';
import { authConstants } from '../constants';

type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;

const setUser = (user: firebase.User | null) => ({
  type: authConstants.SET_USER,
  user,
});

const retrieveUserSession: ThunkActionCreator = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    dispatch(setUser(user));
  });
};

const authActions = { setUser, retrieveUserSession };
export default authActions;
