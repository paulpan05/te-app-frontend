import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Card from 'react-bootstrap/Card';
import styles from './listing.module.scss';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface CommentBoxProps {
  dispatch: Dispatch<any>;
}

const CommentBox: React.FC<CommentBoxProps> = ({ dispatch }) => {
  return (
    <div>
      <Card>
        <Card.Title className="commentBoxTitle">Comments</Card.Title>
        <h1>Comments</h1>>
        <CommentList />
        <CommentForm />
      </Card>
    </div>
  );
};

export default connect()(CommentBox);
