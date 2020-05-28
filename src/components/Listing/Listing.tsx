import React, { useState } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import GreenShirt from '../../assets/img/GreenTshirt.png';
import FlowerImg from '../../assets/img/FlowerShirt.png';
import ViewListing from '../ViewListing/ViewListing';
import book from '../../assets/img/books.jpg';

const Listing: React.FC = ({}) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ margin: '5%' }}>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <Carousel interval={null}>
            <Carousel.Item>
              <img onClick={() => setShow(true)} className={styles.cardImgTop} src={GreenShirt} />
            </Carousel.Item>
            <Carousel.Item>
              <img onClick={() => setShow(true)} className={styles.cardImgTop} src={book} />
            </Carousel.Item>
            <Carousel.Item>
              <img onClick={() => setShow(true)} className={styles.cardImgTop} src={FlowerImg} />
            </Carousel.Item>
          </Carousel>
          <button className={styles.like_btn}>
            <FontAwesomeIcon icon={faHeart} size="lg" className={styles.heart} />
          </button>
        </div>
        <div className={styles.card_content}>
          <h2 className={styles.card_title}>Green T-Shirt</h2>
          <p className={styles.card_text}>$50</p>
          <p className={styles.description}>Posted April 2020</p>
          {/* <button className={styles.btn}>Contact Seller</button> */}
        </div>
      </div>
      {show && (
        <ViewListing title="Flower Sweatshirt" seller="Sarah A." show={show} setShow={setShow} />
      )}
    </div>
  );
};
export default connect()(Listing);
