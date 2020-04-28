import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface LoadingProps {
  dispatch: Dispatch<any>;
}

const Loading: React.FC<LoadingProps> = () => <div />;

export default connect()(Loading);
