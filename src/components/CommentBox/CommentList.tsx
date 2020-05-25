import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './listing.module.scss';

interface CommentListProps {
  dispatch: Dispatch<any>;

}

const data = [
  {author: "Allan", text: "This is one comment"},
  {author: "Parth", text: "This is two comment"},
  {author: "Quylan", text: "This is three comment"},
];

const CommentList: React.FC<CommentListProps> = ({dispatch}) => {
  return (
    <div className='commentList'>
      comment list
    </div>
  )
}

export default connect()(CommentList);