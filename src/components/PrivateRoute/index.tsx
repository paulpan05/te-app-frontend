/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { rootState } from '../../redux/reducers';

interface PrivateRouteProps {
  dispatch: Dispatch<any>;
  component: React.FC<any>;
  user: firebase.User | null | undefined;
  [key: string]: any;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const PrivateRoute = connect(
  mapStateToProps,
  // eslint-disable-next-line prettier/prettier
)(({
  dispatch, component: RouteComponent, user, ...rest
}: PrivateRouteProps) => (
  <Route
    {...rest}
    render={(routeProps) => (user ? <RouteComponent {...routeProps} /> : <Redirect to="/login" />)}
  />
));

export default PrivateRoute;
