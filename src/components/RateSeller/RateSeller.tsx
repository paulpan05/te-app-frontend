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
import Rating from '@material-ui/lab/Rating';
import styles from './index.module.scss';
import ProfileImg from '../../assets/img/sarah.png';

interface RateSellerProps {
  show: boolean;
  setShow: Function;
  title: string;
  seller: string;
}
const RateSeller: React.FC<RateSellerProps> = ({ show, setShow, title, seller }) => {
  const [starValue, setStarValue] = React.useState<number | null>(2);
  return (
    <Modal className="newModal" show={show} onHide={() => setShow(false)} size="lg" centered backdrop="static"  >
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
            <h2 className={styles.rateSeller}>Rate Seller</h2>
          </Form.Group>
        </Form.Row>
        <Rating
          name="simple-controlled"
          value={starValue}
          onChange={(event, newValue) => {
            setStarValue(newValue);
          }}
        />
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
