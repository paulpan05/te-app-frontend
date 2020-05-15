import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SignupProps {
  dispatch: Dispatch<any>;
}

class SignupForm extends Component<{}, { profileImgSrc: string, placeholder: string }> {
  componentWillMount() {
    this.setState({ profileImgSrc: blankProfile, placeholder: "Select Alternate..." });
  }

  render() {
    return (
      <Card as={Container} className="mt-4">
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label> {/* TODO is this needed */}
                <Image src={this.state.profileImgSrc} roundedCircle width="200" height="200" className="mt-2 mb-2" />
                <Form.Text>Click to Select a Profile Picture</Form.Text>
                <Form.File
                id="upload-profile"
                accept="image/*"
                hidden={ true }
                onChange={(e: any) => {
                  if (e.target.files && e.target.files.length === 1 && e.target.files[0]) {
                    console.log(e.target.files[0]);
                    URL.revokeObjectURL(this.state.profileImgSrc);
                    this.setState({ profileImgSrc: URL.createObjectURL(e.target.files[0]) });
                  }
                }}
                onLoad={(e: any) => { /* double check this to see if it gets rid of the blob */
                  if (e.target.files && e.target.files.length === 1 && e.target.files[0]) {
                    console.log(this.state.profileImgSrc);
                    URL.revokeObjectURL(this.state.profileImgSrc);
                    console.log(this.state.profileImgSrc);
                  }
                }}/>
                
              </Form.Label>
            </Form.Group>
          </Form.Row>
          
          <Form.Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Preferred Name</Form.Label>
              <Form.Control placeholder="Preferred Name" />
              <Form.Text>This will be displayed instead of your first name</Form.Text>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>First Name</Form.Label>
              <Form.Control plaintext readOnly defaultValue="First Name goes here" />
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Last Name</Form.Label>
              <Form.Control plaintext readOnly defaultValue="Last Name goes here" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Label as={Col} md="2" className="mb-3">Primary Contact</Form.Label>
            <Form.Label as={Col} md="2" className="mb-3">Email goes here</Form.Label>
          </Form.Row>

          <Form.Label>Alternate Contacts</Form.Label>
          <Form.Row>
            <Form.Group as={Col} md="6">
              <InputGroup
                as={InputGroup.Prepend}
                title="Type"
                id="email or number">
                <ButtonGroup aria-label="First group">
                  <Button variant="outline-secondary">Email</Button>
                  <Button variant="outline-secondary">Phone</Button>
                </ButtonGroup>
                <FormControl aria-describedby="emailOrNumber" placeholder="Email" />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="6">
              <InputGroup
                as={InputGroup.Prepend}
                title="Type"
                id="email or number">
                <ButtonGroup aria-label="First group">
                  <Button variant="outline-secondary">Email</Button>
                  <Button variant="outline-secondary">Phone</Button>
                </ButtonGroup>
                <FormControl aria-describedby="emailOrNumber" placeholder="Email" />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Button variant="primary" type="submit" className="mb-2" onClick={() => {
              // Put for database goes here
            }}>Continue</Button>
          </Form.Row>
        </Form>
      </Card>
    );
  }
}

const Signup: React.FC<SignupProps> = ({ dispatch }) => (
  <SignupForm />
);



export default connect()(Signup);
