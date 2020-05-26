import React, { useState } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import RateSeller from './RateSeller';
import styles from './index.module.scss';

const ButtonExample: React.FC = ({}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
    <Alert className={styles.center} variant={"info"}>
      Recent Purchase!
      <Alert.Link onClick={() => setShow(true)}> Click Here</Alert.Link> to Rate Seller.
    </Alert>
      <RateSeller title="Flower Sweatshirt" seller="Sarah A." show={show} setShow={setShow} />
    </div>
  );
};
export default connect()(ButtonExample);
