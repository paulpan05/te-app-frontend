import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import auth, { googleProvider } from '../../configs/firebase';
import { authConstants } from '../constants';

type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;

const setProfilePic = (picture: string) => ({
  type: authConstants.SET_PROFILE_PIC,
  picture,
});

const setUser = (user: firebase.User | null) => ({
  type: authConstants.SET_USER,
  user,
});

const loggingIn = () => ({
  type: authConstants.LOGGING_IN,
});

const logInSuccess = () => ({
  type: authConstants.LOGIN_SUCCESS,
});

const logInFailed = (err: string) => ({
  type: authConstants.LOGIN_FAILED,
  message: err,
});

const dismissLogInFailed = () => ({
  type: authConstants.DISMISS_LOGIN_FAILED,
});

const signingOut = () => ({
  type: authConstants.SIGNING_OUT,
});

const signOutSuccess = () => ({
  type: authConstants.SIGNOUT_SUCCESS,
});

const signOutFailed = (err: string) => ({
  type: authConstants.SIGNOUT_FAILED,
  message: err,
});

const dismissSignOutFailed = () => ({
  type: authConstants.DISMISS_SIGNOUT_FAILED,
});

const retrieveUserSession: ThunkActionCreator = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    dispatch(setUser(user));
  });
};

const logIn: ThunkActionCreator = () => async (dispatch) => {
  try {
    dispatch(loggingIn());
    await auth.signInWithPopup(googleProvider);
    dispatch(logInSuccess());
  } catch (err) {
    dispatch(logInFailed(err.message));
  }
};

const signOut: ThunkActionCreator = () => async (dispatch) => {
  try {
    dispatch(signingOut());
    await auth.signOut();
    dispatch(signOutSuccess());
  } catch (err) {
    dispatch(signOutFailed(err.message));
  }
};

const authActions = {
  retrieveUserSession,
  logIn,
  dismissLogInFailed,
  signOut,
  dismissSignOutFailed,
  setProfilePic,
};
export default authActions;
