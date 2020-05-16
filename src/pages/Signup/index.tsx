import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authActions } from '../../redux/actions';
import blankProfile from './blank-profile-picture.png';
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
import { rootState } from '../../redux/reducers';
import styles from '../Login/index.module.scss';

interface SignupProps {
  user: firebase.User | null | undefined,
  profileImgSrc: string,
  altContact1Placeholder: string,
  altContact2Placeholder: string,
  dispatch: Dispatch<any>
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const Signup: React.FC<SignupProps> = ({ user, dispatch }) => {
  /*let profileImg = await //API call for user profile picture from google goes here// ;
  if (profileImg === null) {
    profileImg = blankProfile;
  }*/
  const [profileImgSrc, setProfileImgSrc] = useState((user && user.photoURL) ? user.photoURL : blankProfile);
  const [altContact1Placeholder, setAltContact1Placeholder] = useState("(123) 456-7890");
  const [altContact2Placeholder, setAltContact2Placeholder] = useState("example@gmail.com");

  return (
    <div className={styles.page}>
      <Card as={Container} className="mt-4">
        <Form>
          <Form.Row>
            <Form.Group as={Col} md="4">
              <Form.Label>
                <Image src={profileImgSrc} roundedCircle width="200" height="200" className="mt-2 mb-2" draggable={false} />
                <Form.Text className="my-auto text-center">Click to Select a Profile Picture</Form.Text>
                <Form.File
                id="upload-profile"
                accept="image/*"
                hidden={ true }
                onChange={(e: any) => {
                  if (e.target.files && e.target.files.length === 1 && e.target.files[0]) {
                    console.log(e.target.files[0]);
                    URL.revokeObjectURL(profileImgSrc);
                    setProfileImgSrc(URL.createObjectURL(e.target.files[0]));
                  }
                }}/>
                
              </Form.Label>
            </Form.Group>

            <Form.Group as={Col} md="8" className="my-auto">
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={(user && user.displayName) ? user.displayName : "Name cannot be rendered: error occurred"} />
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>Primary Contact</Form.Label>
                  <Form.Control
                      plaintext
                      readOnly
                      defaultValue={(user && user.email) ? user.email : "Email cannot be retrieved: error occurred"} />
                </Form.Group>
              </Form.Row>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Preferred Name</Form.Label>
              <Form.Control placeholder="Preferred Name" />
              <Form.Text>This will be displayed instead of your first name</Form.Text>
            </Form.Group>
          </Form.Row>

          <Form.Label>Alternate Contacts</Form.Label>
          <Form.Row>
            <Form.Group as={Col} md="6">
              <InputGroup
                title="Type"
                id="email or number">
                <ToggleButtonGroup as={InputGroup.Prepend} type="radio" name="options" defaultValue={"phone"}>
                  <ToggleButton value={"email"} variant="outline-secondary" onClick={() => {
                    setAltContact1Placeholder("example@gmail.com");
                  }}>Email</ToggleButton>
                  <ToggleButton value={"phone"} variant="outline-secondary" onClick={() => {
                    setAltContact1Placeholder("(123) 456-7890");
                  }}>Phone</ToggleButton>
                </ToggleButtonGroup>
                <FormControl
                  placeholder={altContact1Placeholder}
                  defaultValue={(user && user.phoneNumber) ? user.phoneNumber : ""} />
              </InputGroup>
              <Form.Text>These will be displayed publicly</Form.Text>
            </Form.Group>

            <Form.Group as={Col} md="6">
              <InputGroup
                title="Type"
                id="email or number">
                <ToggleButtonGroup as={InputGroup.Prepend} type="radio" name="options" defaultValue={"email"}>
                  <ToggleButton value={"email"} variant="outline-secondary" onClick={() => {
                    setAltContact2Placeholder("example@gmail.com");
                  }}>Email</ToggleButton>
                  <ToggleButton value={"phone"} variant="outline-secondary" onClick={() => {
                    setAltContact2Placeholder("(123) 456-7890");
                  }}>Phone</ToggleButton>
                </ToggleButtonGroup>
                <FormControl placeholder={altContact2Placeholder} />
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Button variant="primary" type="submit" className="mb-2 mr-2" onClick={() => {
              // validate forms
              // API PUT to database
            }}>Signup</Button>
            
            <Button variant="outline-secondary" className="mb-2" onClick={() => {
              dispatch(authActions.signOut());
            }}>Cancel</Button>
          </Form.Row>
        </Form>
      </Card>
    </div>
  )};

export default connect(mapStateToProps)(Signup);
