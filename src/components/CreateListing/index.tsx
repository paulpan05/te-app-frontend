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
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import styles from './index.module.scss';
import addPhoto from '../../assets/img/add-photo.png';
import { rootState } from '../../redux/reducers';
import { createListing } from '../../api/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { uploadPictures, deletePictures } from '../../api/index';

import TagsDiv from '../Tags/Tags';

interface CreateListingProps {
  user: firebase.User | null | undefined;
  show: boolean;
  setShow: Function;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});
// TODO implemenet tags and upload pictures to s3
const CreateListing: React.FC<CreateListingProps> = ({ user, show, setShow }) => {
  const [pictures, setPictures]: [string[], Function] = useState([]);
  const [pictureFiles, setPictureFiles]: [File[], Function] = useState([]);
  const [dispValidated, setDispValidated] = useState(false);
  let titleInput;
  let priceInput;
  let descriptionInput;
  let locationInput;

  // TODO change this to be a const in another file and export it there, import it to here and other files that use dispTags
  const dispTags = ['Tutoring', 'Housing', 'Rideshare', 'Study Material', 'Clothes', 'Furniture', 'Electronics', 'Appliances', 'Fitness', 'Other', 'On-Campus Pickup', 'Off-Campus Pickup', 'Venmo', 'Cash', 'Dining Dollars', 'Free'];
  const tags = {};
  dispTags.map((tag) => {
    tags[tag] = false;
  });

  const resetForm = async () => {
    titleInput.value = '';
    priceInput.value = '';
    descriptionInput.value = '';
    locationInput.value = '';
    setPictures([]);
    setPictureFiles([]);
    setDispValidated(false);
    const tags = {};
    dispTags.map((tag) => {
      tags[tag] = false;
    });
  }

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Card className="myCard">
        <Form validated={dispValidated} className={styles.wrapper}>
          <Form.Row className="justify-content-center text-center">
          
            <p className="mediumHeader">Create Listing</p>
                          <button
                    type="button"
                    onClick={() => setShow(false)}
                    className="exitButton exitPad"
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" className={styles.exitFlag} />
                  </button>
          </Form.Row>

          <Form.Row className="justify-content-center text-center">
            <Form.Group as={Col} md="6">
              <Form.Label className="bodyText">What are you selling?</Form.Label>
              <Form.Control
                placeholder="Title"
                className={styles.input}
                required
                ref={(ref) => (titleInput = ref)}
              />

              <Form.Label className="bodyText">For how much?</Form.Label>
              <InputGroup>
                <InputGroup.Text className={styles.inputPrepend}>$</InputGroup.Text>
                <Form.Control
                  placeholder="Price in Dollars"
                  type="number"
                  min={0}
                  required
                  className={styles.inputWithPrependAndPostpend}
                  ref={(ref) => (priceInput = ref)}
                />
                <InputGroup.Text className={styles.inputPostpend}>.00</InputGroup.Text>
              </InputGroup>

              <Form.Label className="bodyText">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Description..."
                required
                className={styles.textarea}
                ref={(ref) => (descriptionInput = ref)}
              />

              <Form.Label className="bodyText">Pickup Location</Form.Label>
              <Form.Control
                required
                placeholder="Price Center"
                defaultValue="Price Center"
                className={styles.input}
                ref={(ref) => (locationInput = ref)}
              />

              <Form.Label className="bodyText">Tags</Form.Label>
              <Form.Row className="justify-content-center text-center">
                <TagsDiv
                  tags={dispTags}
                  setTag={(tag: string, active: boolean) => (tags[tag] = active)}
                />
              </Form.Row>
            </Form.Group>

            <Form.Group as={Col} md={{ span: 5, offset: 1 }}>
              <Form.Row className="justify-content-center text-center">
                <Form.Label>Add Images</Form.Label>
                <Carousel>
                  {pictures.length !== 0 ? (
                    pictures.map((src, i) => {
                      return (
                        <Carousel.Item key={i}>
                          <img src={src} style={{minWidth: "30vh"}}/>
                          <button
                            type="button"
                            onClick={() => {
                              // remove picture
                              const removedPicIndexes: number[] = [];
                              setPictures(
                                pictures.filter((pic, i) => {
                                  if (pic !== src) removedPicIndexes.push(i);
                                  return pic !== src;
                                })
                              );
                              setPictureFiles(
                                pictureFiles.filter((file, i) => !removedPicIndexes.includes(i))
                              );
                              URL.revokeObjectURL(src);
                            }}
                            className={styles.deleteButton}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                          </button>
                        </Carousel.Item>
                      );
                    })
                  ) : (
                    <Carousel.Item key={0}>
                      <img src={addPhoto} />
                    </Carousel.Item>
                  )}
                </Carousel>
                <Form.File
                  id="upload-pictures-create-listing"
                  accept="image/*"
                  multiple
                  label="Browse..."
                  data-browse="+"
                  custom
                  onChange={(e: any) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const uploadingPics: string[] = [];
                      const uploadingPicFiles: File[] = [];
                      for (let i = 0; i < e.target.files.length; i++) {
                        if (e.target.files[i]) {
                          console.log(`uploading file: ${e.target.files[i]}`); // TODO
                          uploadingPics.push(URL.createObjectURL(e.target.files[i]));
                          uploadingPicFiles.push(new File([e.target.files[i]], "listingPicture.jpeg", { lastModified: Date.now() }));// TODO this works but need to change it for typescript
                        }
                      }
                      setPictures(pictures.concat(uploadingPics));
                      setPictureFiles(pictureFiles.concat(uploadingPicFiles));
                    }
                  }}
                />
              </Form.Row>
            </Form.Group>
          </Form.Row>

          <Form.Row className="justify-content-center text-center">
            <Button
              className={styles.button}
              onClick={async () => {
                // check if forms are valid
                if (!(titleInput.checkValidity() &&  priceInput.checkValidity() && descriptionInput.checkValidity() && locationInput.checkValidity())) {
                  console.log('not all forms are valid!');
                  //TODO resetForm();
                  return;
                }
                console.log('all forms are valid!');

                // validate form here
                setDispValidated(true);

                // extract values from form
                const parsedTitle = titleInput.value;
                const parsedPrice = parseInt(priceInput.value);
                const parsedDescription = descriptionInput.value;
                const parsedLocation = locationInput.value;
                console.log(
                  `title: ${parsedTitle}, price: ${parsedPrice}, description: ${parsedDescription}, location: ${parsedLocation}`,
                );

                // extract tags
                console.log(`tags: ${tags}`);
                const parsedTags = dispTags.filter((tag) => tags[tag]);
                console.log(`parsedTags: ${parsedTags}`);

                // upload pics to s3
                let pictureURLs;
                if (pictureFiles.length > 0 && pictures.length > 0) { // if uploaded pictures
                  console.log(`pictureFiles before upload: ${pictureFiles}`);
                  pictureURLs = await uploadPictures(user, pictureFiles); // TODO this works but need to change it for typescript
                  if (pictureURLs) {
                    console.log("Successfully uploaded listing pictures to s3, urls: ", pictureURLs);
                  } else {
                    // error while uploading
                    console.log("Error while uploading the profile picture!");
                    toast('An error occurred while uploading your listing pictures! Please try resubmitting or reuploading.');
                    return;
                  }
                } else {
                  // no pictures to upload
                  pictureURLs = undefined;
                  console.log("No listing pictures to upload.");
                }

                // create the listing in the db
                const success = await createListing(
                  user,
                  parsedTitle,
                  parsedPrice,
                  parsedDescription,
                  parsedLocation,
                  parsedTags,
                  pictureURLs,
                );

                if (success) {
                  setShow(false);
                  toast('The listing was successfully created!');
                } else {
                  toast(
                    'There was an error while creating your listing! Try to create it again or reload.',
                  );
                  // TODO in this case, you should delete the pictures you've uploaded (if you don't, they'll just waste space)
                  if (pictureURLs) deletePictures(pictureURLs);
                }
              }}
            >
              Create
            </Button>

          </Form.Row>
        </Form>
      </Card>
    </Modal>
  );
};

export default connect(mapStateToProps)(CreateListing);
