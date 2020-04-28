import { AnyAction } from 'redux';
import { authConstants } from '../constants';

export interface authState {
  user: firebase.User | null | undefined;
}

const initialState: authState = {
  user: undefined,
};

const auth = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case authConstants.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default auth;
