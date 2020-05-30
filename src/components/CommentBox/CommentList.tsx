import React from 'react';
import styles from './index.module.scss';
import Comment from './Comment';

interface CommentListProps {
  currentUser: firebase.User | null | undefined;
  commentsData: string[][];
  listingId: string;
}

const CommentList: React.FC<CommentListProps> = ({currentUser, commentsData, listingId }) => {
  const messagesEndRef = React.useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current!.scrollIntoView({ behavior: 'smooth' });
  };


  const commentNodes = commentsData.map((comment: string[]) => {
    if (!comment[0]) return;
    return <Comment currentUser={currentUser} commentId={comment[0]} userId={comment[1]} content={comment[2]} listingId={listingId} />;
  });

  React.useEffect(scrollToBottom, [commentNodes]);

  return (
    <div className={styles.commentList}>
      {commentNodes}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default CommentList;
