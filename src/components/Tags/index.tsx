import React, { useState, Props } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import styles from './index.module.scss';
import TagButton from '../Button';

const Tags: React.FC = ({}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scrolls}>
        <div className={styles.imageDiv}>
          <TagButton children="Tutoring" value={0} />
          <TagButton children="Housing" value={1} />
          <TagButton children="Rideshare" value={2} />
          <TagButton children="Study Material" value={3} />
          <TagButton children="Clothes" value={4} />
          <TagButton children="Furniture" value={5} />
          <TagButton children="Electronics" value={6} />
          <TagButton children="Appliances" value={7} />
          <TagButton children="Fitness" value={8} />
          <TagButton children="Other" value={9} />
          <TagButton children="On-Campus Pickup" value={10} />
          <TagButton children="Off-Campus Pickup" value={11} />
          <TagButton children="Venmo" value={12} />
          <TagButton children="Cash" value={13} />
          <TagButton children="Dining Dollars" value={14} />
        </div>
      </div>
    </div>
  );
};
export default connect()(Tags);
