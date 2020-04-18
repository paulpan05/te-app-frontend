import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-open-sans';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';

const App: React.FC = () => {
  return (<h1>Hello World</h1>);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
