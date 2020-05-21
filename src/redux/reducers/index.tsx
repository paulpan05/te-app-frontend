import { combineReducers } from 'redux';
import auth, { authState } from './auth';
import modal, { modalState } from './modal';

const rootReducer = combineReducers({
  auth,
  modal,
});

export interface rootState {
  auth: authState;
  modal: modalState;
}

export default rootReducer;
