import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import auth, { googleProvider } from '../../configs/firebase';
import { authConstants } from '../constants';

type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;

const setUser = (user: firebase.User | null) => ({
  type: authConstants.SET_USER,
  user,
});

const removeUser = () => ({
  type: authConstants.REMOVE_USER,
});

const logInFailed = (err: string) => ({
  type: authConstants.LOGIN_FAILED,
  message: err,
});

const signOutFailed = (err: string) => ({
  type: authConstants.SIGNOUT_FAILED,
  message: err,
});

const retrieveUserSession: ThunkActionCreator = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    dispatch(setUser(user));
  });
};

const logIn: ThunkActionCreator = () => async (dispatch) => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    dispatch(setUser(result.user));
  } catch (err) {
    dispatch(logInFailed(err.message));
  }
};

const signOut: ThunkActionCreator = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(removeUser());
  } catch (err) {
    dispatch(signOutFailed(err.message));
  }
};

const authActions = { retrieveUserSession, logIn, signOut };
export default authActions;
