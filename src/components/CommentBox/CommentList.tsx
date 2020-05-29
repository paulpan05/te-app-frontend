import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './index.module.scss';
import Comment from './Comment';

interface CommentListProps {
  currentUser: firebase.User | null | undefined;
  commentsData: Array<Comment>;
}

interface Comment {
  commentId: string;
  userId: string;
  content: string;
}

const CommentList: React.FC<CommentListProps> = ({currentUser, commentsData }) => {
  const messagesEndRef = React.useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current!.scrollIntoView({ behavior: 'smooth' });
  };

  const commentNodes = commentsData.map((comment: Comment) => {
    if (!comment) return;
    return <Comment currentUser={currentUser} commentId={comment.commentId} userId={comment.userId} content={comment.content} />;
  });

  React.useEffect(scrollToBottom, [commentNodes]);

  return (
    <div className={styles.commentList}>
      {commentNodes}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default connect()(CommentList);
