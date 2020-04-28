import React, { Dispatch } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import 'typeface-open-sans';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';
import Login from './pages/Login';
import rootStore from './redux/stores';
import authActions from './redux/actions/auth';

interface AppProps {
  dispatch: Dispatch<any>;
}

const AppComponent: React.FC<AppProps> = ({ dispatch }) => {
  React.useEffect(() => {
    dispatch(authActions.retrieveUserSession());
  }, []);
  return <Login />;
};

const App = connect()(AppComponent);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
