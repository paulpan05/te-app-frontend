import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import EditListing from './index';

const ButtonExample: React.FC = ({}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button onClick={() => setShow(true)}>Click me</Button>
      <EditListing show={show} setShow={setShow} listingId="9b17c7f8-bc39-402d-a9a2-d07bd7b28840" creationTime={1590753995962} titleProp="dfghj" priceProp={45678} descriptionProp="ghjk" locationProp="jhsdlfjk" tagsProp={["Rides", "Furniture"]} picturesProp={[]} />
    </div>
  );
};

export default connect()(ButtonExample);
