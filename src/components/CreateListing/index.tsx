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
import Cropper from 'react-easy-crop';
import { Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast';
import CustomToggleButton from '../CustomToggleButton/index';
import styles from './index.module.scss';
import addPhoto from '../../assets/img/add-photo.png';
import { rootState } from '../../redux/reducers';

interface CreateListingProps {
  show: boolean;
  setShow: Function;
}

const CreateListing: React.FC<CreateListingProps> = ({ show, setShow }) => {
  const [images, setImages] = useState([addPhoto]);
  const [submitted, setSubmitted] = useState(false);

  /* const tags = await // API call to database for list of tags goes here */
  const tags = ['Furniture', 'Rides', 'Tutoring', 'Appliances', 'Technology'];

  useEffect(() => {
    return () => {
      /* remove photos from memory here (this is the same as componentUnmount) */
    };
  });

  return (
    <div>
      <Toast
        onClose={() => setSubmitted(false)}
        show={submitted}
        delay={3000}
        autohide
        className={styles.notification}
      >
        <Toast.Header>
          <div className="mr-auto">Success!</div>
        </Toast.Header>
        <Toast.Body>The listing was successfully created!</Toast.Body>
      </Toast>

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Card>
          <Form className={styles.wrapper}>
            <Form.Row className="justify-content-center text-center">
              <h1>Create Listing</h1>
            </Form.Row>

            <Form.Row className="justify-content-center text-center">
              <Form.Group as={Col} md="6">
                <Form.Label className={styles.text}>What are you selling?</Form.Label>
                <Form.Control placeholder="Title" className={styles.input} />

                <Form.Label className={styles.text}>For how much?</Form.Label>
                <InputGroup>
                  <InputGroup.Text className={styles.inputPrepend}>$</InputGroup.Text>
                  <Form.Control
                    placeholder="Price in Dollars"
                    className={styles.inputWithPrependAndPostpend}
                  />
                  <InputGroup.Text className={styles.inputPostpend}>.00</InputGroup.Text>
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

                <Form.Label className={styles.text}>Tags</Form.Label>
                <Form.Row className="justify-content-center text-center">
                  {tags.map((tagLabel, i) => {
                    return <CustomToggleButton value={i}>{tagLabel}</CustomToggleButton>;
                  })}
                </Form.Row>
              </Form.Group>

              <Form.Group as={Col} md={{ span: 5, offset: 1 }}>
                <Form.Row className="justify-content-center text-center">
                  <Form.Label>Add Images</Form.Label>
                  <Carousel>
                    {images.map((src, i) => (
                      <Carousel.Item key={i}>
                        <img src={src} onClick={() => console.log('hi')} />
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
                        const uploadingImgs: string[] = [];
                        for (let i = 0; i < e.target.files.length; i++) {
                          if (e.target.files[i]) {
                            uploadingImgs.push(URL.createObjectURL(e.target.files[i]));
                          }
                        }
                        setImages([...images, ...uploadingImgs]);
                      }
                    }}
                  />
                </Form.Row>
              </Form.Group>
            </Form.Row>

            <Form.Row className="justify-content-center text-center">
              <Button
                className={styles.button}
                onClick={() => {
                  /*
                    API call goes here
                  */
                  setSubmitted(true);
                  setShow(false);
                }}
              >
                Create
              </Button>

              <Button className={styles.secondaryButton} onClick={() => setShow(false)}>
                Cancel
              </Button>
            </Form.Row>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default connect()(CreateListing);