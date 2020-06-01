import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './index.module.scss';
import ProfileImg from '../../assets/img/sarah.png';
import { v4 as uuidv4 } from 'uuid';
import { text } from '@fortawesome/fontawesome-svg-core';
import {getUserProfile} from '../../api';
interface CommentFormProps {
  user: firebase.User | null | undefined;
  onCommentSubmit: Function;
}

let textData = '';

const CommentForm: React.FC<CommentFormProps> = ({ user, onCommentSubmit, }) => {
  const [txt, setTxt] = useState('');
  const [myProfile, setMyProfile] = useState<any>();
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
  useEffect(() => {
    getUserProfile(user, undefined, setMyProfile);
  },[]);
  return (
    <div>
      {myProfile && 
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <img src={myProfile.picture} className={styles.authorPicture} alt="author" />
        <input
          type="text"
          className={styles.commentInput}
          onChange={handleTextChange}
          value={txt}
          placeholder="Write a Comment... (100 chars limit)"
        />
      </form>}
    </div>
  );
};

export default connect()(CommentForm);
