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
import styles from './index.module.scss';
import Rating from '@material-ui/lab/Rating';

interface RateBuyerProps {
  dispatch: Dispatch<any>;
  show: boolean;
  setShow: Function;
  title: string;
}

const RateBuyer: React.FC<RateBuyerProps> = ({ dispatch, show, setShow, title }) => {
  const [starValue, setStarValue] = React.useState<number | null>(2);
  
  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg" dialogClassName={styles.soldDialog}>
      <h1 className="mx-auto text-center">Mark as Sold</h1>
      <Form className="text-center">
        <h4 className="mx-auto">{title}</h4>
        <Form.Row className="justify-content-center">
          <Form.Group as={Col} className="text-center">
            <Form.Control placeholder="Enter Buyer Name" className={styles.input} />
          </Form.Group>
        </Form.Row>

        <Form.Row className="justify-content-center">
          <Form.Group as={Col} className="text-center">
            <Form.Label className={styles.text}>Rate Buyer</Form.Label>
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

export default connect()(RateBuyer);
