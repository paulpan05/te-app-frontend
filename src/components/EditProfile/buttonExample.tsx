import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import EditProfile from './index';

const ButtonExample: React.FC = ({}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button onClick={() => setShow(true)}>Click me</Button>
      <EditProfile show={show} setShow={setShow} nameProp="name here" phoneProp="phone here" pictureProp="picturehere" />
    </div>
  );
};

export default connect()(ButtonExample);
