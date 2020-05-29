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
import styles from './index.module.scss';
import blankProfile from '../../assets/img/blank-profile-picture.png';
import { rootState } from '../../redux/reducers';
import { toast } from 'react-toastify';
import { updateProfile } from '../../api/index';

interface EditProfileProps {
  user: firebase.User | null | undefined;
  dispatch: Dispatch<any>;
  show: boolean;
  setShow: Function;
  phoneProp: string;
  pictureProp: string;
  nameProp: string;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const EditProfile: React.FC<EditProfileProps> = ({ user, dispatch, show, setShow, phoneProp, pictureProp, nameProp }) => {
  const [profileImgSrc, setProfileImgSrc] = useState(pictureProp);
  const [name, setName] = useState(nameProp);
  const [phone, setPhone] = useState(phoneProp);

  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({ width: 0, height: 0, x: 0, y: 0 });

  const cropImage = async () => {
    const image = document.createElement('img');
    image.src = profileImgSrc;
    const canvas = document.createElement('canvas');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return profileImgSrc;
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

    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => resolve(URL.createObjectURL(file)), 'image/jpeg');
    });
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Card>
        <Container>
          <Row className="justify-content-center text-center">
            <h1>Edit Your Profile</h1>
          </Row>

          <Form>
            <Form.Row className="justify-content-center">
              <Form.Group as={Col} sm="6" lg="5">
                {cropping ? (
                  <div className={styles.profilePictureWrapper}>
                    <div className={styles.cropContainer}>
                      <Cropper
                        image={profileImgSrc}
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
                          cropImage().then((croppedImg: any) => {
                            setProfileImgSrc(croppedImg);
                            setCropping(false);
                          });
                        }}
                      >
                        Save
                      </Button>
                    </Form.Row>
                  </div>
                ) : (
                  <Form.Label className={styles.profilePictureWrapper}>
                    <Image
                      src={profileImgSrc}
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
                          URL.revokeObjectURL(profileImgSrc);
                          setProfileImgSrc(URL.createObjectURL(e.target.files[0]));
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
                <Form.Label className={styles.text}>Preferred Name</Form.Label>
                <Form.Control
                  placeholder="Preferred Name"
                  className={styles.input}
                  defaultValue={name}
                />
                <Form.Text>
                  This will be displayed instead of your name (so include your last name)
                </Form.Text>
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
                  defaultValue={phone}
                  className={styles.input}
                />
                <Form.Text>This will be displayed publicly, along with your UCSD email</Form.Text>
              </Form.Group>
            </Form.Row>

            <Form.Row className="justify-content-center">
              <Button
                className={styles.button}
                onClick={async () => {
                  // validate forms
                  // API PUT to database
                  const success = await updateProfile(
                    user,
                    '12345678',
                    'picture goes here',
                    'name goes here',
                  );
                  if (success) {
                    setShow(false);
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
