import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './index.module.scss';
import Comment from './Comment';

interface CommentListProps {
  dispatch: Dispatch<any>;
  data: Array<string>;
}

const exampleData = [
  { author: 'Allan', text: 'This is one comment' },
  { author: 'Parth', text: 'This is two comment' },
  { author: 'Quylan', text: 'This is three comment' },
];

const CommentList: React.FC<CommentListProps> = ({ dispatch, data }) => {
  const commentNodes = data.map((comment: string) => {
    return <Comment text={comment}></Comment>;
  });

  return <div className={styles.commentList}>{commentNodes}</div>;
};

export default connect()(CommentList);
