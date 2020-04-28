import { combineReducers } from 'redux';
import auth, { authState } from './auth';

const rootReducer = combineReducers({
  auth,
});

export interface rootState {
  auth: authState;
}

export default rootReducer;
