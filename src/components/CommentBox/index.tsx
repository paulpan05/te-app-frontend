import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Card from 'react-bootstrap/Card';
import styles from './index.module.scss';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface CommentBoxProps {
  dispatch: Dispatch<any>;
  data: Array<string>;
}

const CommentBox: React.FC<CommentBoxProps> = ({ dispatch }, data) => {
  const [stateData, setData] = useState(['']);

  // let exData = [
  //   'test',
  //   'hi',
  //   'lol',
  //   'cse110',
  //   'is',
  //   'a',
  //   'joke',
  //   'more',
  //   'comment',
  //   'lol',
  //   'lol',
  //   'lol',
  // ];

  // const handleCommentSubmit = (comment: { author: string; text: string }) => {
  //   data.push(comment);
  //   const comments = data;
  //   const newComments = comments.concat([comment]);
  //   //setData(newComments);
  // };

  const handleCommentSubmit = (comment: string) => {
    setData([...stateData, comment]);
  };

  return (
    <div>
      <Card className={styles.commentBox}>
        <Card.Title className={styles.commentBoxTitle}>Comments</Card.Title>
        <CommentList data={stateData} />
        <CommentForm onCommentSubmit={handleCommentSubmit} />
      </Card>
    </div>
  );
};

export default connect()(CommentBox);
