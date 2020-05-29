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
import CustomToggleButton from '../CustomToggleButton/index';
import styles from '../CreateListing/index.module.scss';
import addPhoto from '../../assets/img/add-photo.png';
import { rootState } from '../../redux/reducers';
import { toast } from 'react-toastify';
import { updateListing } from '../../api/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

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
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});
// TODO implemenet tags and upload pictures to s3. also make props required, not optional
const EditListing: React.FC<EditListingProps> = ({
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
  const validated = [true, true, true, true];
  const which = { title: 0, price: 1, description: 2, location: 3 };
  let titleInput;
  let priceInput;
  let descriptionInput;
  let locationInput;

  /* const tags = await // API call to database for list of tags goes here. paul needs to make an endpoint for it. hard code it for now */
  const dispTags = ['Furniture', 'Rides', 'Tutoring', 'Appliances', 'Technology'];

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Card>
        <Form validated={dispValidated} className={styles.wrapper}>
          <Form.Row className="justify-content-center text-center">
            <h1>Edit Listing</h1>
          </Form.Row>

          <Form.Row className="justify-content-center text-center">
            <Form.Group as={Col} md="6">
              <Form.Label className={styles.text}>What are you selling?</Form.Label>
              <Form.Control
                placeholder="Title"
                className={styles.input}
                required
                ref={(ref) => (titleInput = ref)}
                onChange={(e) => {
                  validated[which.title] = e.target.value.length > 0;
                }}
                defaultValue={titleProp}
              />

              <Form.Label className={styles.text}>For how much?</Form.Label>
              <InputGroup>
                <InputGroup.Text className={styles.inputPrepend}>$</InputGroup.Text>
                <Form.Control
                  placeholder="Price in Dollars"
                  type="number"
                  min={0}
                  required
                  className={styles.inputWithPrependAndPostpend}
                  ref={(ref) => (priceInput = ref)}
                  onChange={(e) => {
                    validated[which.price] = e.target.value.length > 0;
                  }}
                  defaultValue={priceProp}
                />
                <InputGroup.Text className={styles.inputPostpend}>.00</InputGroup.Text>
              </InputGroup>

              <Form.Label className={styles.text}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Description..."
                required
                className={styles.textarea}
                ref={(ref) => (descriptionInput = ref)}
                onChange={(e) => {
                  validated[which.description] = e.target.value.length > 0;
                }}
                defaultValue={descriptionProp}
              />

              <Form.Label className={styles.text}>Pickup Location</Form.Label>
              <Form.Control
                required
                placeholder="Price Center"
                defaultValue={locationProp}
                className={styles.input}
                ref={(ref) => (locationInput = ref)}
                onChange={(e) => {
                  validated[which.location] = e.target.value.length > 0;
                }}
              />

              <Form.Label className={styles.text}>Tags</Form.Label>
              <Form.Row className="justify-content-center text-center">
                {dispTags.map((tagLabel, i) => {
                  return <CustomToggleButton value={i}>{tagLabel}</CustomToggleButton>;
                })}
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
                              setPictures(pictures.filter((pic) => pic !== src));
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
                  id="upload-pictures-edit-listing"
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
                      setPictures(pictures.concat(uploadingImgs));
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
                // validate form here
                setDispValidated(true);

                let allValidated = true;
                for (const i of validated) {
                  allValidated = allValidated && i;
                }

                if (!allValidated) {
                  console.log('not all forms are valid!');
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
                console.log(title, price, description, location);

                // check which photos/tags have changed
                const picturesAdded = pictures.filter((pic) => !picturesProp.includes(pic));
                const picturesDeleted = picturesProp.filter((pic) => !pictures.includes(pic));
                console.log(`added pictures: ${picturesAdded}`);
                console.log(`deleted pictures: ${picturesDeleted}`);

                //TODO extract the tags. Ask aarushi
                const tags = ['lkj'];
                const tagsAdded = tags.filter((pic) => !tagsProp.includes(pic));
                const tagsDeleted = tagsProp.filter((pic) => !tags.includes(pic));

                const successAdd = await updateListing(
                  user,
                  listingId,
                  creationTime,
                  parsedTitle,
                  parsedPrice,
                  parsedDescription,
                  parsedLocation,
                  ['pictures go here'], // add new pictures here
                  [], // add new tags here
                  undefined,
                  false,
                  false,
                  undefined,
                );
                
                // delete old pictures and tags here
                const successDelete = await updateListing(
                  user,
                  listingId,
                  creationTime,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  ['picture srcs go here'], // add deleted pictures here
                  [], // add deleted tags here
                  undefined,
                  true,
                  true,
                  undefined,
                );

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

            <Button className={styles.secondaryButton} onClick={() => setShow(false)}>
              Cancel
            </Button>
          </Form.Row>
        </Form>
      </Card>
    </Modal>
  );
};

export default connect(mapStateToProps)(EditListing);
