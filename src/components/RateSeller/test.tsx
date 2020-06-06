import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import RateSeller from './RateSeller';

const ButtonExample: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Button onClick={() => setShow(true)}>Mark as Sold</Button>
      <RateSeller title="Flower Sweatshirt" seller="Sarah A." show={show} setShow={setShow} />
    </div>
  );
};
export default connect()(ButtonExample);
