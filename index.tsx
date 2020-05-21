import React, { useState } from 'react';
import { connect } from 'react-redux';
import RateSeller from './RateSeller';
import Button from 'react-bootstrap/Button';

const ButtonExample: React.FC = ({}) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <Button onClick={() => setShow(true)}>Mark as Sold</Button>
            <RateSeller title="Flower Sweatshirt" seller ="Sarah A." show={show} setShow={setShow}></RateSeller>
        </div>
    )
}
export default connect()(ButtonExample);