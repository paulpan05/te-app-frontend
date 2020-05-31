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
import CustomToggleButton from '../CustomToggleButton/index';
import styles from '../CreateListing/index.module.scss';
import DeletePopup from '../DeletePopup/index'
import addPhoto from '../../assets/img/add-photo.png';
import { rootState } from '../../redux/reducers';
import { updateListing, uploadPictures, deletePictures } from '../../api/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import TagsDiv from '../Tags/Tags';

interface EditListingProps {
  user: firebase.User | null | undefined;
  show: boolean;
  setShow: Function;
  listingId: string;
  creationTime: number;
  titleProp: string;
  priceProp: number;
  descriptionProp: string;
  locationProp: string;
  tagsProp: string[];
  picturesProp: string[];
  showDeleteSetter: Function;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});
// TODO implemenet tags and upload pictures to s3. also make props required, not optional
const EditListing: React.FC<EditListingProps> = ({
  showDeleteSetter,
  user,
  show,
  setShow,
  listingId,
  creationTime,
  titleProp,
  priceProp,
  descriptionProp,
  locationProp,
  tagsProp,
  picturesProp,
}) => {
  const [pictures, setPictures]: [string[], Function] = useState(picturesProp);
  const [dispValidated, setDispValidated] = useState(false);
  let addedPictureFiles: File[] = [];
  let picURLsToDelFromS3: string[] = [];
  const URLtoPictureFile = {};
  let titleInput;
  let priceInput;
  let descriptionInput;
  let locationInput;

  // TODO change this to be a const in another file and export it there, import it to here and other files that use dispTags
  const dispTags = ['Tutoring', 'Housing', 'Rideshare', 'Study Material', 'Clothes', 'Furniture', 'Electronics', 'Appliances', 'Fitness', 'Other', 'On-Campus Pickup', 'Off-Campus Pickup', 'Venmo', 'Cash', 'Dining Dollars', 'Free'];
  const tags = {};
  dispTags.map((tag) => {
    if (tagsProp[tag]) {
      tags[tag] = true;
    } else {
      tags[tag] = false;
    }
  });

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Card className="roundedBorder">
        <Form validated={dispValidated} className={styles.wrapper}>
          <Form.Row className="justify-content-center text-center">
          <p className="mediumHeader">Edit Listing</p>
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
                defaultValue={titleProp}
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
                  defaultValue={priceProp}
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
                defaultValue={descriptionProp}
              />

              <Form.Label className="bodyText">Pickup Location</Form.Label>
              <Form.Control
                required
                placeholder="Price Center"
                defaultValue={locationProp}
                className={styles.input}
                ref={(ref) => (locationInput = ref)}
              />

              <Form.Label className="bodyText">Tags</Form.Label>
              <Form.Row className="justify-content-center text-center">
                <TagsDiv
                  tags={dispTags}
                  initialActiveTags={tagsProp}
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
                          <img src={src} />
                          <button
                            type="button"
                            onClick={() => {
                              // remove picture
                              // TODO right now, if a user uploasd 10 images, then deletes 5, 10 images will be uploaded to s3. this is because addedpicturefiles isnt changed (and this is what gets added to s3)
                              setPictures(
                                pictures.filter((pic, i) => {
                                  return pic !== src;
                                })
                              );
                              // if this picture is an old picture (not newly uploaded; if it's in the db)
                              if (picturesProp.includes(src)) {
                                // old picture -- need to remove it from database
                                picURLsToDelFromS3.push(src);
                              } else {
                                // newly uploaded picture -- remove from addedPictureFiles
                                addedPictureFiles = addedPictureFiles.filter((file, i) => file !== URLtoPictureFile[src]);
                              }
                              //URL.revokeObjectURL(src);
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
                  id="upload-pictures-edit-listing"
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
                          const picURL = URL.createObjectURL(e.target.files[i]);
                          const picFile = new File([e.target.files[i]], e.target.files[i].name, { lastModified: Date.now() });
                          uploadingPics.push(picURL);
                          uploadingPicFiles.push(picFile);// TODO this works but need to change it for typescript
                          URLtoPictureFile[picURL] = picFile;
                        }
                      }
                      setPictures(pictures.concat(uploadingPics));
                      addedPictureFiles = addedPictureFiles.concat(uploadingPicFiles);
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

                // extract values from form and check if they've been changed
                const title = titleInput.value;
                const parsedTitle = title !== titleProp ? title : undefined;

                const price = parseInt(priceInput.value);
                const parsedPrice = price !== priceProp ? price : undefined;

                const description = descriptionInput.value;
                const parsedDescription = description !== descriptionProp ? description : undefined;

                const location = locationInput.value;
                const parsedLocation = location !== locationProp ? location : undefined;
                console.log(
                  `(undefined = unchanged) title: ${parsedTitle}, price: ${parsedPrice}, description: ${parsedDescription}, location: ${parsedLocation}`,
                );

                // extract the tags
                const parsedTags = dispTags.filter((tag) => tags[tag]);
                const addedTags = parsedTags.filter((pic) => !tagsProp.includes(pic));
                const deletedTags = tagsProp.filter((pic) => !parsedTags.includes(pic));
                console.log(`tags added: ${addedTags}`);
                console.log(`tags deleted: ${deletedTags}`);

                // upload new pictures from s3
                let addedPictureURLs;
                if (addedPictureFiles.length > 0) { // if uploaded pictures
                  addedPictureURLs = await uploadPictures(user, addedPictureFiles); // TODO this works but need to change it for typescript
                  if (addedPictureURLs) {
                    console.log("Successfully uploaded listing pictures to s3, urls: ", addedPictureURLs);
                  } else {
                    // error while uploading
                    console.log("Error while uploading the profile picture!");
                    toast('An error occurred while uploading your listing pictures! Please try resubmitting or reuploading.');
                    return;
                  }
                } else {
                  // no pictures to upload
                  addedPictureURLs = [];
                  console.log("No listing pictures to upload.");
                }

                // check which photos have been deleted
                console.log(`pictures to delete from s3: ${picURLsToDelFromS3}`);

                // delete deleted pictures from s3
                if (picURLsToDelFromS3.length > 0) { // if uploaded pictures
                  const failure = await deletePictures(picURLsToDelFromS3); // TODO this works but need to change it for typescript
                  if (!failure) {
                    console.log('Successfully deleted listing pictures that the user removed!');
                  } else {
                    console.log(`Error: failed to delete all old listing pictures from s3. continue to upload new listing pictures anyways. URLs: ${failure}`);
                  }
                } else {
                  // no pictures to delete
                  console.log("No listing pictures to delete.");
                }
                
                console.log("about to run the api to add info to the listing");
                /* TODO: test this */
                const successAdd = await updateListing(
                  user,
                  listingId,
                  creationTime,
                  parsedTitle,
                  parsedPrice,
                  parsedDescription,
                  parsedLocation,
                  addedPictureURLs,
                  addedTags,
                  undefined,
                  false,
                  false,
                  undefined,
                );
                
                console.log("about to run the api to delete info from the listing");
                // delete old pictures and tags here
                const successDelete = await updateListing(
                  user,
                  listingId,
                  creationTime,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  picURLsToDelFromS3,
                  deletedTags,
                  undefined,
                  true,
                  true,
                  undefined,
                );
                  console.log(successAdd)
                  console.log(successDelete)
                // TODO what would happen if the successAdd works but successDelete fails? wouldn't it add new pictures but tell the user that no new pictures were added? also vice versa

                if (successAdd && successDelete) {
                  setShow(false);
                  toast('The listing was successfully edited!');
                } else {
                  toast(
                    'There was an error while editing your listing! Try to edit it again or reload.',
                  );
                }
              }}
            >
              Update
            </Button>

            <Button
              type="button"
              onClick={() => showDeleteSetter(true)}
              className={styles.button}>
                Delete
            </Button>
          </Form.Row>
        </Form>
      </Card>
    </Modal>
  );
};

export default connect(mapStateToProps)(EditListing);

/*
  */