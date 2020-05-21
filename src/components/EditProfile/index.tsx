import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cropper from 'react-easy-crop';
import Modal from 'react-bootstrap/Modal';
import { Redirect } from 'react-router-dom';
import { rootState } from '../../redux/reducers';
import blankProfile from './blank-profile-picture.png';
import { authActions } from '../../redux/actions';
import Signup from '../../pages/Signup';

interface EditProfileProps {
  user: firebase.User | null | undefined;
  dispatch: Dispatch<any>;
}

// TODO match figma, change it to a modal, and add cropping (use Cropper in a modal in onChange() and add to the callback to update the profileImgSrc).
const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const EditProfile: React.FC<EditProfileProps> = ({ user, dispatch }) => {
  /* let profileImg = await //API call for user profile picture from google goes here// ;
  if (profileImg === null) {
    profileImg = blankProfile;
  } */

  const [show, setShow] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  /* <Cropper
                      image={profileImgSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={3 / 3}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      cropShape="round"
                      showGrid={false}
                    /> */

  return (
    <div>
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        Click me, please
      </Button>
      <Modal show={show} onHide={() => setShow(false)} animation={false} size="lg">
        <Modal.Header closeButton>Edit Your Profile</Modal.Header>
        <Signup />
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps)(EditProfile);
