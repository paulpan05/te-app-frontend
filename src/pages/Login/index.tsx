import React from 'react';

const Login: React.FC = () => {
  return (<div>{process.env.REACT_APP_FIREBASE_PROJECT_ID}</div>);
}

export default Login;