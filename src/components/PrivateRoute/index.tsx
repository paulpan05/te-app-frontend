/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { rootState } from '../../redux/reducers';

interface PrivateRouteProps extends Omit<RouteProps, 'render'> {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  dispatch,
  component: RouteComponent,
  user,
  ...rest
}: PrivateRouteProps) => (
  <Route
    {...rest}
    render={(routeProps) => {
      if (user) {
        return RouteComponent && <RouteComponent {...routeProps} />;
      }
      if (user === null) {
        return <Redirect to="/login" />;
      }
      return <></>;
    }}
  />
);

export default connect(mapStateToProps)(PrivateRoute);
