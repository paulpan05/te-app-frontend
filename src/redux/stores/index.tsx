import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const rootStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default rootStore;
