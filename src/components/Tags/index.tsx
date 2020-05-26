import React, { useState, Props } from 'react';
import Button from 'react-bootstrap/Button';
import styles from './index.module.scss';
import { connect } from 'react-redux';
import TagButton from '../Button';

const Tags: React.FC = () => {

  return (
    <div className={styles.wrapper}>
  <div className={styles.scrolls}>
  <div className={styles.imageDiv}>
        <TagButton children="Tutoring" value={1}></TagButton>
        <TagButton children="Housing" value={1}></TagButton>
        <TagButton children="Rideshare" value={1}></TagButton>
        <TagButton children="Study Material" value={1}></TagButton>
        <TagButton children="Clothes" value={1}></TagButton>
        <TagButton children="Furniture" value={1}></TagButton>
        <TagButton children="Electronics" value={1}></TagButton>
        <TagButton children="Appliances" value={1}></TagButton>
        <TagButton children="Fitness" value={1}></TagButton>
        <TagButton children="Other" value={1}></TagButton>
        <TagButton children="On-Campus Pickup" value={1}></TagButton>
        <TagButton children="Off-Campus Pickup" value={1}></TagButton>
        <TagButton children="Venmo" value={1}></TagButton>
        <TagButton children="Cash" value={1}></TagButton>
        <TagButton children="Dining Dollars" value={1}></TagButton>
    </div>
  </div>
  </div>
    )
  }
export default connect()(Tags);



