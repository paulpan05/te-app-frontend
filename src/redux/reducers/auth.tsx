import { AnyAction } from 'redux';
import { authConstants } from '../constants';

export interface authState {
  user: firebase.User | null | undefined;
  loggingIn: boolean;
  logInFailedMessage: string | undefined;
  signingOut: boolean;
  signOutFailedMessage: string | undefined;
}

const initialState: authState = {
  user: undefined,
  loggingIn: false,
  logInFailedMessage: undefined,
  signingOut: false,
  signOutFailedMessage: undefined,
};

const auth = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case authConstants.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case authConstants.LOGGING_IN:
      return {
        ...state,
        loggingIn: true,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
      };
    case authConstants.LOGIN_FAILED:
      return {
        ...state,
        loggingIn: false,
        logInFailedMessage: action.message,
      };
    case authConstants.DISMISS_LOGIN_FAILED:
      return {
        ...state,
        logInFailedMessage: undefined,
      };
    case authConstants.SIGNING_OUT:
      return {
        ...state,
        signingOut: true,
      };
    case authConstants.SIGNOUT_SUCCESS:
      return {
        ...state,
        signingOut: false,
      };
    case authConstants.SIGNOUT_FAILED:
      return {
        ...state,
        signingOut: false,
        signOutFailedMessage: action.message,
      };
    case authConstants.DISMISS_SIGNOUT_FAILED:
      return {
        ...state,
        signOutFailedMessage: undefined,
      };
    default:
      return state;
  }
};

export default auth;
