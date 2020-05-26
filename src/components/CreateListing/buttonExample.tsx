import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import CreateListing from './index';

const ButtonExample: React.FC = ({}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button onClick={() => setShow(true)}>Click me</Button>
      <CreateListing show={show} setShow={setShow} />
    </div>
  );
};

export default connect()(ButtonExample);
