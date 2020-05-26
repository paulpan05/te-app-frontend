import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './index.module.scss';
import Comment from './Comment';

interface CommentListProps {
  dispatch: Dispatch<any>;
  data: Array<string>;
}

const CommentList: React.FC<CommentListProps> = ({ dispatch, data }) => {
  const messagesEndRef = React.useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current!.scrollIntoView({ behavior: 'smooth' });
  };

  const commentNodes = data.map((comment: string) => {
    if (!comment) return;
    return <Comment text={comment} />;
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
