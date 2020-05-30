import React, { useState, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './index.module.scss';
import ProfileImg from '../../assets/img/sarah.png';
import { v4 as uuidv4 } from 'uuid';
import { text } from '@fortawesome/fontawesome-svg-core';

interface CommentFormProps {
  user: firebase.User | null | undefined;
  onCommentSubmit: Function;
}

let textData = '';

const CommentForm: React.FC<CommentFormProps> = ({ user, onCommentSubmit }) => {
  const [txt, setTxt] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    textData = event.target.value;
    setTxt(textData);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let textVal = textData.trim();
    if (!textVal) {
      return;
    }
    if(textVal.length > 100)
      textVal = textVal.substring(0, 100);
    const newComment = [uuidv4(), user?.uid, textVal];
    onCommentSubmit(newComment);
    setTxt('');
    textData = '';
  };

  return (
    <div>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <img src={ProfileImg} className={styles.authorPicture} alt="author" />
        <input
          type="text"
          className={styles.commentInput}
          onChange={handleTextChange}
          value={txt}
          placeholder="Write a Comment... (100 chars limit)"
        />
      </form>
    </div>
  );
};

export default connect()(CommentForm);
