import React, { useState, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './index.module.scss';
import ProfileImg from '../../assets/img/sarah.png';

interface CommentFormProps {
  dispatch?: Dispatch<any>;
  onCommentSubmit: Function;
}

let textData = '';

const CommentForm: React.FC<CommentFormProps> = ({ dispatch, onCommentSubmit }) => {
  const [txt, setTxt] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    textData = event.target.value;
    setTxt(textData);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const textVal = textData.trim();
    if (!textVal) {
      return;
    }
    onCommentSubmit(textVal);
    setTxt('');
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
          placeholder="Write a Comment..."
        />
      </form>
    </div>
  );
};

export default connect()(CommentForm);
