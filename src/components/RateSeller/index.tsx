import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
// import StarRatings from 'react-star-ratings';
import styles from './index.module.scss';
import ProfileImg from '../../assets/img/sarah.png';

/* <StarRatings
          rating={2.403}
          starRatedColor="#FDCC0D"
          starDimension="40px"
          starSpacing="15px"
          className={styles.rating}
        /> */

interface RateSellerProps {
  dispatch: Dispatch<any>;
  show: boolean;
  setShow: Function;
  title: string;
  seller: string;
}
const RateSeller: React.FC<RateSellerProps> = ({ dispatch, show, setShow, title, seller }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <h1 className="mx-auto text-center">Recent Purchase!</h1>
      <Form className="text-center">
        <h3 className="mx-auto">{title}</h3>
        <img className={styles.profilePicture} src={ProfileImg} />
        <h4 className="mx-auto">
          Sold By:
          {seller}
        </h4>
        <Form.Row className="justify-content-center">
          <Form.Group as={Col} md="auto" className="text-center">
            <Form.Label className={styles.text}>Rate Seller</Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Form.Group as={Col} md="6" className="text-center">
            <Form.Label className={`${styles.text} ${styles.comments}`}>Comments?</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Comment..."
              className={styles.textarea}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Button
            type="submit"
            className={styles.button}
            onClick={() => {
              // POST goes here
            }}
          >
            Mark as Sold
          </Button>
        </Form.Row>
      </Form>
    </Modal>
  );
};
export default connect()(RateSeller);
