/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { rootState } from '../../redux/reducers';
import Loading from '../../pages/Loading';
import Login from '../../pages/Login';

interface PrivateRouteProps {
  dispatch: Dispatch<any>;
  component: React.FC<any>;
  user: firebase.User | null | undefined;
  [key: string]: any;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const PrivateRouteComponent: React.FC<PrivateRouteProps> = ({
  dispatch,
  component: RouteComponent,
  user,
  ...rest
}: PrivateRouteProps) => (
  <Route
    {...rest}
    render={(routeProps) => {
      if (user) {
        return <RouteComponent {...routeProps} />;
      }
      if (user === null) {
        return <Login />;
      }
      return <Loading />;
    }}
  />
);

export default connect(mapStateToProps)(PrivateRouteComponent);
