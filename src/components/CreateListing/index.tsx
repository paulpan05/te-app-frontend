import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { rootState } from '../../redux/reducers';
import Cropper from 'react-easy-crop';
import { Redirect } from 'react-router-dom';
import blankProfile from '../../assets/img/blank-profile-picture.png';
import styles from './index.module.scss';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Carousel from 'react-bootstrap/Carousel';
import ToggleButton from '../ToggleButton/index';

interface CreateListingProps {
  show: boolean;
  setShow: Function;
}

const CreateListing: React.FC<CreateListingProps> = ({ show, setShow }) => {
  const [images, setImages] = useState([blankProfile]);

  /* const tags = await // API call to database for list of tags goes here */
  const tags = ["Furniture", "Rides", "Tutoring", "Appliances", "Technology"];

  useEffect(() => {
    return () => {
      /* remove photos from memory here (this is the same as componentUnmount) */
    }
  })
  
  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Form>
        <Form.Row className="justify-content-center text-center">
          <h1>Create Listing</h1>
        </Form.Row>

        <Form.Row className="justify-content-center text-center">
          <Form.Group as={Col} md="6">
            <Form.Label className={styles.text}>What are you selling?</Form.Label>
            <Form.Control placeholder="Title" className={styles.input} />

            <InputGroup className={styles.input}>
              <InputGroup.Prepend className={styles.input}>
                <InputGroup.Text className={styles.text}>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control placeholder="Price in Dollars" className={styles.input} />
            </InputGroup>

            <Form.Label className={styles.text}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Description..."
              className={styles.textarea}
            />

            <Form.Label className={styles.text}>Pickup Location</Form.Label>
            <Form.Control placeholder="Price Center" className={styles.input} />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Row>
              <Form.Label className={styles.text}>Add Images</Form.Label>
              <Carousel>
                {images.map((src, i) => (
                  <Carousel.Item key={i}>
                    <img
                      src={src}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <Form.File
                id="upload-images-create-listing"
                accept="image/*"
                multiple
                label="Browse..."
                data-browse="+"
                custom
                onChange={(e: any) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const uploadingImgs = [];
                    for (let i = 0; i < e.target.files.length; i++) {
                      if (e.target.files[i]) {
                        uploadingImgs.push(URL.createObjectURL(e.target.files[i]));
                      }
                    }
                    setImages([...images, ...uploadingImgs]);
                  }
                }} />
            </Form.Row>
              {tags.map((tagLabel, i) => {
                return (
                  <ToggleButton value={i}>{tagLabel}</ToggleButton>
                );
              })}
            <Form.Row>
              
            </Form.Row>
          </Form.Group>
        </Form.Row>
      </Form>
    </Modal>
  )
}

export default connect()(CreateListing);