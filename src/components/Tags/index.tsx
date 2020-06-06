import React from 'react';
import { connect } from 'react-redux';
import styles from './index.module.scss';
import TagButton from '../Button';

interface TagsProps {
  tags: string[];
  setTag: Function; // (tag: string, boolean)
}

const Tags: React.FC<TagsProps> = ({ tags, setTag }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scrolls}>
        <div className={styles.imageDiv}>
          <TagButton tags={tags} setTag={setTag} value={0}>
            Tutoring
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={1}>
            Housing
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={2}>
            Rideshare
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={3}>
            Study Material
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={4}>
            Clothes
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={5}>
            Furniture
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={6}>
            Electronics
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={7}>
            Appliances
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={8}>
            Fitness
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={9}>
            Other
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={10}>
            On-Campus Pickup
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={11}>
            Off-Campus Pickup
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={12}>
            Venmo
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={13}>
            Cash
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={14}>
            Dining Dollars
          </TagButton>
          <TagButton tags={tags} setTag={setTag} value={15}>
            Free
          </TagButton>
        </div>
      </div>
    </div>
  );
};
export default connect()(Tags);
