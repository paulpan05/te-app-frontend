import React, { useState } from 'react';
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
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import styles from './index.module.scss';
import blankProfile from '../../assets/img/blank-profile-picture.png';
import { rootState } from '../../redux/reducers';
import { updateProfile, uploadPicture, deletePicture } from '../../api/index';

interface EditProfileProps {
  user: firebase.User | null | undefined;
  dispatch: Dispatch<any>;
  show: boolean;
  setShow: Function;
  phoneProp?: string;
  pictureProp: string;
  nameProp: string;
  renderOnChange: Function;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const EditProfile: React.FC<EditProfileProps> = ({
  user,
  dispatch,
  show,
  setShow,
  phoneProp,
  pictureProp,
  nameProp,
  renderOnChange,
}) => {
  const [picture, setPicture] = useState(pictureProp);
  const [pictureFile, setPictureFile] = useState<File>();
  const [dispValidated, setDispValidated] = useState(false);
  let nameInput;
  let phoneInput;
  let validated = true;

  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({ width: 0, height: 0, x: 0, y: 0 });

  const cropImage = async () => {
    const image = document.createElement('img');
    image.src = picture;
    const canvas = document.createElement('canvas');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return picture;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    return new Promise<Blob | null>((resolve, reject) => {
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
    });
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Card>
        <Container>
          <Row className="justify-content-center text-center">
            <h1>Hi {nameProp}, Edit Your Profile Below</h1>
          </Row>

          <Form validated={dispValidated}>
            <Form.Row className="justify-content-center">
              <Form.Group as={Col} sm="6" lg="5">
                {cropping ? (
                  <div className={styles.profilePictureWrapper}>
                    <div className={styles.cropContainer}>
                      <Cropper
                        image={picture}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        cropShape="round"
                        showGrid={false}
                        onCropComplete={(croppedArea, croppedAreaPixels) => {
                          setCroppedAreaPixels(croppedAreaPixels);
                        }}
                      />
                    </div>
                    <Form.Row className="justify-content-center">
                      <Button
                        className={styles.button}
                        onClick={async () => {
                          const croppedPic = await cropImage();
                          if (croppedPic) {
                            setPictureFile(new File([croppedPic], "profilePicture.jpeg", { type: "image/jpeg", lastModified: Date.now() }));// TODO this works but need to change it for typescript
                            setPicture(URL.createObjectURL(croppedPic));
                          } else {
                            console.log('Error while trying to parse the uploaded picture!');
                            toast('Error while trying to crop your image! Please upload a different picture');
                          }
                          setCropping(false);
                        }}
                      >
                        Save
                      </Button>
                    </Form.Row>
                  </div>
                ) : (
                  <Form.Label className={styles.profilePictureWrapper}>
                    <Image
                      src={picture}
                      roundedCircle
                      className={styles.profilePicture}
                      draggable={false}
                    />
                    <Form.Text className="my-auto text-center">
                      Click to Select a Profile Picture
                    </Form.Text>
                    <Form.File
                      id="upload-profile"
                      accept="image/*"
                      hidden
                      onChange={(e: any) => {
                        if (e.target.files && e.target.files.length === 1 && e.target.files[0]) {
                          URL.revokeObjectURL(picture);
                          setPicture(URL.createObjectURL(e.target.files[0]));
                          setCropping(true);
                        }
                      }}
                    />
                  </Form.Label>
                )}
              </Form.Group>
            </Form.Row>

            <Form.Row className="justify-content-center">
              <Form.Group as={Col} md="5" lg="4" className="text-center">
                <Form.Label className={styles.text}>Name</Form.Label>
                <Form.Control
                  placeholder="Name"
                  className={styles.input}
                  defaultValue={nameProp}
                  ref={(ref) => (nameInput = ref)}
                />
              </Form.Group>

              <Form.Group
                as={Col}
                md={{ span: 5, offset: 1 }}
                lg={{ span: 4, offset: 1 }}
                className="text-center"
              >
                <Form.Label className={styles.text}>Phone Number</Form.Label>
                <FormControl
                  placeholder="(123) 456-7890"
                  ref={(ref) => (phoneInput = ref)}
                  defaultValue={phoneProp}
                  className={styles.input}
                  pattern="([ ]*\+?[ ]*[0-9]{0,4}[ ]*(-|\()?[0-9]{3}[ ]*(-|\))?[ ]*[0-9]{3}[ ]*-?[ ]*[0-9]{4}[ ]*)?"
                  onChange={(e) => {
                    validated = !e.target.validity.patternMismatch;
                  }}
                />
                <Form.Text>This will be displayed publicly, along with your UCSD email</Form.Text>
              </Form.Group>
            </Form.Row>

            <Form.Row className="justify-content-center">
              <Button
                className={styles.button}
                onClick={async (e) => {
                  // validate the form
                  setDispValidated(true);

                  if (!validated) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }

                  // parse phone number in correct format
                  const phone = phoneInput.value;
                  let parsedPhone;
                  if (phone.length > 0) {
                    // remove all spaces, -, (, ), +
                    parsedPhone = phone.replace(/( |-|\(|\)|\+)/g, ''); //TODO test
                    const ppLen = parsedPhone.length;
                    parsedPhone = [
                      ppLen > 11 ? '+' : '',
                      parsedPhone.slice(0, ppLen - 10),
                      ppLen > 10 ? ' ' : '',
                      '(',
                      parsedPhone.slice(ppLen - 10, ppLen - 7),
                      ') ',
                      parsedPhone.slice(ppLen - 7, ppLen - 4),
                      '-',
                      parsedPhone.slice(ppLen - 4),
                    ].join('');
                  } else {
                    parsedPhone = undefined;
                  }

                  // check if phone number was edited
                  if (parsedPhone === phoneProp) {
                    parsedPhone = undefined;
                  }

                  // get name from input, check if it was edited
                  const val = nameInput.value;
                  const parsedName = val.length > 0 && val !== nameProp ? val : undefined;

                  // if picture was edited & was converted to a file & picture isn't the same as Google account's picture
                  let pictureURL;
                  if (picture !== pictureProp && pictureFile && picture !== user?.photoURL) {
                    // upload new profile picture to s3
                    pictureURL = await uploadPicture(user, pictureFile); // TODO this works but need to change it for typescript
                    if (pictureURL) {
                      console.log("Done uploading profile picture to s3, url: ", pictureURL);
                    } else {
                      console.log("Error while uploading the profile picture!");
                      toast('An error occurred while uploading your profile picture! Please try reuploading or reload the page.');
                      return;
                    }
                    
                    // delete old profile picture. TODO check if old profile picture was Google's 
                    const success = await deletePicture(pictureProp);
                    if (success) {
                      console.log('successfully deleted old profile picture from s3.');
                    } else {
                      console.log('Error: failed to delete old profile picture from s3. continue to upload new profile picture anyways.');
                    }
                    
                  } else {
                    pictureURL = undefined;
                  }

                  // API PUT to database
                  const success = await updateProfile(user, parsedPhone, pictureURL, parsedName);
                  if (success) {
                    setShow(false);
                    renderOnChange();
                    toast('Your profile was edited successfully!');
                  } else {
                    toast(
                      "There was an error and your edited profile wasn't saved! Try to edit your profile again",
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
        </Container>
      </Card>
    </Modal>
  );
};

export default connect(mapStateToProps)(EditProfile);
