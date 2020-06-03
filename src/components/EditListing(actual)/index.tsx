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
import DeletePopup from '../DeletePopup/index';
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
  instantChange?: Function;
  reloadSetter?: Function;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

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
  instantChange,
  reloadSetter,
}) => {
  const [pictures, setPictures]: [string[], Function] = useState(picturesProp); // pictures for the preview
  const [dispValidated, setDispValidated] = useState(false); // should the form display validations?
  const [addedPictureFiles, setAddedPictureFiles] = useState<File[]>([]); // picture files that were added
  const [toDelFromS3, setToDelFromS3] = useState<string[]>([]); // urls to remove from s3
  const [newUploads, setNewUploads] = useState<any>({}); // newly uploaded pictures/files
  const [form, setForm] = useState<HTMLFormElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  let titleInput;
  let priceInput;
  let descriptionInput;
  let locationInput;

  const dispTags = [
    'Tutoring',
    'Housing',
    'Rideshare',
    'Study Material',
    'Clothes',
    'Furniture',
    'Electronics',
    'Appliances',
    'Fitness',
    'Other',
    'On-Campus Pickup',
    'Off-Campus Pickup',
    'Venmo',
    'Cash',
    'Dining Dollars',
    'Free',
  ];
  const initTags = {};
  dispTags.map((tag) => {
    if (tagsProp.includes(tag)) {
      initTags[tag] = true;
    } else {
      initTags[tag] = false;
    }
  });
  const [tags, setTags] = useState<any>({...initTags});
  
  return (
    <Modal show={show} onHide={() => {
      setShow(false);
      setDispValidated(false);
    }} size="lg">
      <Card className="roundedBorder">
        <Form validated={dispValidated} className={styles.wrapper} ref={(ref) => setForm(ref) }>
          <Form.Row className="justify-content-center text-center">
            <p className="mediumHeader">Edit Listing</p>
            <button type="button" onClick={() => setShow(false)} className="exitButton exitPad">
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
                maxLength={20}
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
            </Form.Group>

            <Form.Group as={Col} md={{ span: 5, offset: 1 }}>
              <Form.Label>Add Images</Form.Label>
              <Form.Row className="justify-content-center text-center">
                <Carousel activeIndex={activeIndex} onSelect={(selectedIndex, e) => setActiveIndex(selectedIndex)} className={styles.editListingCarousel} >
                  {pictures.length !== 0 ? (
                    pictures.map((src, i) => {
                      return (
                        <Carousel.Item key={i}>
                          <img src={src} className={styles.carouselImage} />
                          <button
                            type="button"
                            onClick={() => {
                              setPictures(
                                // keep the picture if it isn't the src picture
                                pictures.filter((pic) => pic !== src),
                              );
                              // if the picture to delete came from the database
                              if (picturesProp.includes(src)) {
                                // need to remove it from database
                                setToDelFromS3(toDelFromS3.concat([src]));
                              } else {
                                // newly uploaded picture -- remove from addedPictureFiles
                                setAddedPictureFiles(
                                  addedPictureFiles.filter((file) => file !== newUploads[src]),
                                );
                              }
                              if (activeIndex !== 0) setActiveIndex(activeIndex - 1);
                              //URL.revokeObjectURL(src); TODO
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
                    // if the uploaded files exists
                    if (e.target.files && e.target.files.length > 0) {
                      const uploadingPics: string[] = [];
                      const uploadingPicFiles: File[] = [];
                      for (let i = 0; i < e.target.files.length; i++) {
                        if (e.target.files[i]) {
                          const picURL = URL.createObjectURL(e.target.files[i]);
                          const picFile = new File([e.target.files[i]], e.target.files[i].name, {
                            lastModified: Date.now(),
                          });
                          uploadingPics.push(picURL);
                          uploadingPicFiles.push(picFile);

                          const temp = { ...newUploads };
                          temp[picURL] = picFile;
                          setNewUploads(temp);
                        }
                      }
                      setPictures(pictures.concat(uploadingPics));
                      setAddedPictureFiles(addedPictureFiles.concat(uploadingPicFiles));
                      e.target.value = '';
                    }
                  }}
                />
              </Form.Row>
            </Form.Group>
          </Form.Row>

          <Form.Row className="justify-content-center text-center">
            <Form.Label className="bodyText">Tags</Form.Label>
            <Form.Row className="justify-content-center text-center">
              <TagsDiv
                tags={dispTags}
                initialActiveTags={tagsProp}
                setTag={(tag: string, active: boolean) => {
                  const temp = {...tags};
                  temp[tag] = active;
                  setTags({...temp});
                }}
              />
            </Form.Row>
          </Form.Row>

          <Form.Row className="justify-content-center text-center">
            <Button
              className={styles.button}
              onClick={async () => {
                // validate form here
                setDispValidated(true);

                // check if forms are valid
                if (!form?.checkValidity() || !(titleInput && priceInput && descriptionInput && locationInput)) {
                  console.log('not all forms are valid!');
                  toast('Make sure to fill out all necessary forms before submitting!');
                  return;
                }
                if (pictures.length <= 0) {
                  console.log('need to provide at least 1 picture.');
                  toast('Make sure to upload at least 1 photo before submitting');
                  return;
                }
                console.log('all forms are valid!');

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
                const addedTags = parsedTags.filter((tag) => !tagsProp.includes(tag));
                const deletedTags = tagsProp.filter((tag) => !parsedTags.includes(tag));
                console.log(`all tags: ${parsedTags}`);
                console.log(`tags added: ${addedTags}`);
                console.log(`tags deleted: ${deletedTags}`);

                // upload new pictures from s3
                let addedPictureURLs;
                if (addedPictureFiles.length > 0) {
                  // if uploaded pictures
                  addedPictureURLs = await uploadPictures(user, addedPictureFiles);
                  if (addedPictureURLs) {
                    console.log(
                      'Successfully uploaded listing pictures to s3, urls: ',
                      addedPictureURLs,
                    );
                  } else {
                    // error while uploading
                    console.log('Error while uploading the profile picture!');
                    toast(
                      'An error occurred while uploading your listing pictures! Please try resubmitting or reuploading.',
                    );
                    return;
                  }
                } else {
                  // no pictures to upload
                  console.log('No listing pictures to upload.');
                  addedPictureURLs = [];
                  /*
                  if (pictures.length > 0) {
                    addedPictureURLs = [];
                  } else {
                    // upload the default picture
                    addedPictureURLs = await uploadPicture(user, new File());
                    addedPictureURLs = ["https://triton-exchange-bucket-photos.s3.amazonaws.com/full-app-logo.svg"];
                  }*/
                }

                // check which photos have been deleted
                console.log(`Pictures to delete from s3: ${toDelFromS3}`);

                // delete deleted pictures from s3
                if (toDelFromS3.length > 0) {
                  // if uploaded pictures
                  const success = await deletePictures(toDelFromS3);
                  if (success) {
                    console.log('Successfully deleted listing pictures that the user removed!');
                  } else {
                    console.log(
                      'Error: failed to delete old listing pictures from s3. Continue to update listing anyways.',
                    );
                  }
                } else {
                  console.log('No listing pictures to delete.');
                }

                console.log('about to run the api to add info to the listing');
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
                  undefined,
                  undefined,
                  undefined,
                );

                console.log('about to run the api to delete info from the listing');
                // delete old pictures and tags here
                const successDelete = await updateListing(
                  user,
                  listingId,
                  creationTime,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  toDelFromS3,
                  deletedTags,
                  undefined,
                  true,
                  true,
                  undefined,
                );

                if (successAdd && successDelete) {
                  if (instantChange)
                    instantChange();
                  reloadSetter && reloadSetter(true);
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

            <Button type="button" onClick={() => showDeleteSetter(true)} className={styles.button}>
              Delete
            </Button>
          </Form.Row>
        </Form>
      </Card>
    </Modal>
  );
};

export default connect(mapStateToProps)(EditListing);
