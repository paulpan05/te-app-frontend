import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Card from 'react-bootstrap/Card';
import styles from './index.module.scss';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface CommentBoxProps {
  dispatch?: Dispatch<any>;
  user: firebase.User | null | undefined;
  commentsData: Array<Comment>;
}

interface Comment {
  commentId: string;
  userId: string;
  content: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ dispatch, user, commentsData}) => {
  const [stateData, setData] = useState(commentsData);

  const handleCommentSubmit = (newComment: { commentId: string, userId: string; content: string }) => {
    setData([...stateData, newComment]);
    commentsData.push(newComment);
    //const comments = data;
    //const newComments = comments.concat([comment]);
    //setData(newComments);
  };

  // const handleCommentSubmit = (comment: string) => {
  //   setData([...stateData, comment]);
  // };

  return (
    <div>
      <Card className={styles.commentBox}>
        <Card.Title className={styles.commentBoxTitle}>Comments</Card.Title>
        <CommentList currentUser={user} commentsData={stateData} />
        <CommentForm user={user} onCommentSubmit={handleCommentSubmit} />
      </Card>
    </div>
  );
};

export default connect()(CommentBox);
