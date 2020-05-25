import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'typeface-open-sans';
import 'normalize.css';
import 'focus-visible/dist/focus-visible.min';
import './styles/index.scss';
import { Dispatch } from 'redux';
import * as serviceWorker from './serviceWorker';
import rootStore from './redux/stores';
import authActions from './redux/actions/auth';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import RateBuyerButton from './components/RateBuyer/buttonExample';
import Profile from './pages/Profile';
import Comment from './components/CommentBox/Comment';

interface AppProps {
  dispatch: Dispatch<any>;
}

const AppComponent: React.FC<AppProps> = ({ dispatch }) => {
  React.useEffect(() => {
    dispatch(authActions.retrieveUserSession());
  }, [dispatch]);

  const [signingUp, setSigningUp] = useState(false);

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/">
        <PrivateRoute exact path="/signup" component={Signup} />
        <Navbar dispatch={dispatch} />
        <Switch>
          <PrivateRoute exact path="/ratebuyer" component={RateBuyerButton} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/test" component={Comment} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Route>
    </Switch>
  );
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
