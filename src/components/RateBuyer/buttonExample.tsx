import React, { useState } from 'react';
import { connect } from 'react-redux';
import RateBuyer from './index';
import Button from 'react-bootstrap/Button';

const ButtonExample: React.FC = ({}) => {
    const [show, setShow] = useState(false);
    
    return (
        <div>
            <Button onClick={() => setShow(true)}>Click me</Button>
            <RateBuyer title="Flower Sweatshirt" show={show} setShow={setShow}></RateBuyer>
        </div>
    )
}

export default connect()(ButtonExample);