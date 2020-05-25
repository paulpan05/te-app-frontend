import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './listing.module.scss';

interface CommentFormProps {
  dispatch: Dispatch<any>;

}

const CommentForm: React.FC<CommentFormProps> = ({dispatch}) => {
  return (
    <div className='commentForm'>
      comment form
    </div>
  )
}

export default connect()(CommentForm);