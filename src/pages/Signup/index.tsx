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
import { toast } from 'react-toastify';
import styles from './index.module.scss';
import { rootState } from '../../redux/reducers';
import { userSignup } from '../../api/index';

interface SignupProps {
  user: firebase.User | null | undefined;
  dispatch: Dispatch<any>;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const Signup: React.FC<SignupProps> = ({ user, dispatch }) => {
  const [picture, setPicture] = useState(user && user.photoURL ? user.photoURL : 'ignore');
  const [phone, setPhone] = useState('');
  const [prefName, setPrefName] = useState('');
  const [dispValidated, setDispValidated] = useState(false);
  const [validated, setValidated] = useState(true);

  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [redirect, setRedirect] = useState(false);
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

    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => resolve(URL.createObjectURL(file)), 'image/jpeg');
    });
  };

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <Row className="text-center">
        <Col md="12">
          <h1>Welcome{user && user.displayName ? user.displayName : ''}!</h1>
        </Col>
        <Col md="12">
          <h4>Finish Setting Up Your Account</h4>
        </Col>
      </Row>

      <Form validated={dispValidated}>
        <Form.Row className="justify-content-center">
          <Form.Group as={Col} sm="4" lg="3">
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
                      cropImage().then((croppedImg: any) => {
                        setPicture(croppedImg);
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
          <Form.Group as={Col} md="4" lg="3" className="text-center">
            <Form.Label className={styles.text}>Preferred Name</Form.Label>
            <Form.Control
              placeholder="Preferred Name"
              type="text"
              className={styles.input}
              onChange={(e) => {
                setPrefName(e.target.value);
              }}
            />
            <Form.Text>
              This will be displayed instead of your name (so include your last name)
            </Form.Text>
          </Form.Group>

          <Form.Group
            as={Col}
            md={{ span: 4, offset: 1 }}
            lg={{ span: 3, offset: 1 }}
            className="text-center"
          >
            <Form.Label className={styles.text}>Phone Number</Form.Label>
            <FormControl
              placeholder="(123) 456-7890"
              defaultValue={phone}
              className={styles.input}
              pattern="([ ]*\+?[ ]*[0-9]{0,4}[ ]*(-|\()?[0-9]{3}[ ]*(-|\))?[ ]*[0-9]{3}[ ]*-?[ ]*[0-9]{4}[ ]*)?"
              onChange={(e) => {
                if (e.target.validity.patternMismatch) {
                  setValidated(false);
                } else {
                  setValidated(true);
                  setPhone(e.target.value);
                }
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone number.
            </Form.Control.Feedback>
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
              let parsedPhone;
              if (phone.length > 0) {
                parsedPhone = phone.replace(/( |-|\(|\))/g, '');
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

              // api request
              const success = await userSignup(user, parsedPhone, prefName, undefined, 'customPic');
              if (success) {
                setRedirect(true);
                toast('You successfully created an account! Welcome to Triton Exchange');
              } else {
                toast('There was an error while setting up your account! Try to signup again');
              }
            }}
          >
            Create Account
          </Button>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default connect(mapStateToProps)(Signup);
