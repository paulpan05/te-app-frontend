import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import RateBuyer from './index';

const ButtonExample: React.FC = ({}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button onClick={() => setShow(true)}>Click me</Button>
      <RateBuyer title="Flower Sweatshirt" show={show} setShow={setShow} />
    </div>
  );
};

export default connect()(ButtonExample);
