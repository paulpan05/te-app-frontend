import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './index.module.scss';
import ProfileImg from '../../assets/img/sarah.png';

interface CommentProps {
  dispatch?: Dispatch<any>;
  text: string;
}

const Comment: React.FC<CommentProps> = ({ dispatch, text }) => {
  return (
    <div className={styles.comment}>
      <img src={ProfileImg} className={styles.authorPicture} alt="author" />
      <span className={styles.commentText}>{text}</span>
    </div>
  );
};

export default connect()(Comment);
