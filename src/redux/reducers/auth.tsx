import { AnyAction } from 'redux';
import { authConstants } from '../constants';

export interface authState {
  user: firebase.User | null | undefined;
  logInFailedMessage: string | undefined;
  signOutFailedMessage: string | undefined;
}

const initialState: authState = {
  user: undefined,
  logInFailedMessage: undefined,
  signOutFailedMessage: undefined,
};

const auth = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case authConstants.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case authConstants.LOGIN_FAILED:
      return {
        ...state,
        logInFailedMessage: action.message,
      };
    case authConstants.SIGNOUT_FAILED:
      return {
        ...state,
        signOutFailedMessage: action.message,
      };
    default:
      return state;
  }
};

export default auth;
