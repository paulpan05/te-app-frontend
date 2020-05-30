import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Card from 'react-bootstrap/Card';
import styles from './index.module.scss';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import {updateComments} from '../../api';

interface CommentBoxProps {
  dispatch?: Dispatch<any>;
  user: firebase.User | null | undefined;
  listingId: string;
  creationTime: number;
  commentsData: string[][];
}


const CommentBox: React.FC<CommentBoxProps> = ({ dispatch, user, listingId, creationTime, commentsData}) => {
  const [stateData, setData] = useState(commentsData);
  const handleCommentSubmit = (newComment: string[]) => {
    setData([...stateData, newComment]);
    updateComments(user, listingId, creationTime, [newComment]);
  };

  return (
    <div>
      <Card className={styles.commentBox}>
        <Card.Title className={styles.commentBoxTitle}>Comments</Card.Title>
        <CommentList currentUser={user} commentsData={stateData} listingId={listingId}/>
        <CommentForm user={user} onCommentSubmit={handleCommentSubmit} />
      </Card>
    </div>
  );
};

export default connect()(CommentBox);
