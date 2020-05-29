import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import EditListing from './index';

const ButtonExample: React.FC = ({}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button onClick={() => setShow(true)}>Click me</Button>
      <EditListing show={show} setShow={setShow} listingId="ffghj" creationTime={34567} titleProp="dfghj" priceProp={45678} descriptionProp="ghjk" locationProp="jhsdlfjk" tagsProp={[]} picturesProp={[]} />
    </div>
  );
};

export default connect()(ButtonExample);
