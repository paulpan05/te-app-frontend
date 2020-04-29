import React, { Dispatch } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-open-sans';
import './styles/reset.scss';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';
import rootStore from './redux/stores';
import authActions from './redux/actions/auth';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';

interface AppProps {
  dispatch: Dispatch<any>;
}

const AppComponent: React.FC<AppProps> = ({ dispatch }) => {
  React.useEffect(() => {
    dispatch(authActions.retrieveUserSession());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <PrivateRoute exact path="/" component={Home} />;
};

const App = connect()(AppComponent);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
