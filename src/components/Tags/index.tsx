import React, { useState, Props } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import styles from './index.module.scss';
import TagButton from '../Button';

interface TagsProps {
  tags: string[];
  setTag: Function; // (tag: string, boolean)
}

const Tags: React.FC<TagsProps> = ({tags, setTag}) => {
  return (
    <div className="wrapper maxWidth95">
      <div className={styles.scrolls}>
        <div className={styles.imageDiv}>
          <TagButton tags={tags} setTag={setTag} children="Tutoring" value={0} />
          <TagButton tags={tags} setTag={setTag} children="Housing" value={1} />
          <TagButton tags={tags} setTag={setTag} children="Rideshare" value={2} />
          <TagButton tags={tags} setTag={setTag} children="Study Material" value={3} />
          <TagButton tags={tags} setTag={setTag} children="Clothes" value={4} />
          <TagButton tags={tags} setTag={setTag} children="Furniture" value={5} />
          <TagButton  tags={tags} setTag={setTag} children="Electronics" value={6} />
          <TagButton  tags={tags} setTag={setTag} children="Appliances" value={7} />
          <TagButton  tags={tags} setTag={setTag} children="Fitness" value={8} />
          <TagButton  tags={tags} setTag={setTag} children="Other" value={9} />
          <TagButton  tags={tags} setTag={setTag} children="On-Campus Pickup" value={10} />
          <TagButton  tags={tags} setTag={setTag} children="Off-Campus Pickup" value={11} />
          <TagButton  tags={tags} setTag={setTag} children="Venmo" value={12} />
          <TagButton  tags={tags} setTag={setTag} children="Cash" value={13} />
          <TagButton  tags={tags} setTag={setTag} children="Dining Dollars" value={14} />
          <TagButton  tags={tags} setTag={setTag} children="Free" value={15} />
        </div>
      </div>
    </div>
  );
};
export default connect()(Tags);
