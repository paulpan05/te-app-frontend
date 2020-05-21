import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons'
import FlowerImg from '../../assets/GreenShirt.png';
import ViewListing from './ViewListing';

const Listing: React.FC = ({}) => {
    const [show, setShow] = useState(false);
    return (
        
        <div>
        <div className={styles.card}>
          <div className={styles.cardImage}>
            <img onClick={() => setShow(true)} className={styles.cardImgTop} src={FlowerImg}></img>
            <button className={styles.like_btn}><FontAwesomeIcon icon={faHeart} size="lg" className={styles.heart} /></button>
          </div>
          <div className={styles.card_content}>
            <p className={styles.card_text}>$50</p>
            <h2 className={styles.card_title}>Green T-Shirt</h2>
            <button className={styles.btn}>Contact Seller</button>
          </div>
        </div>

        <ViewListing title="Flower Sweatshirt" seller ="Sarah A." show={show} setShow={setShow}></ViewListing>
        </div>
        
    )
}
export default connect()(Listing);