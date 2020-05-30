import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import GreenShirt from '../../assets/img/GreenTshirt.png';
import FlowerImg from '../../assets/img/FlowerShirt.png';
import ViewListing from '../ViewListing/ViewListing';
import book from '../../assets/img/books.jpg';
import CustomToggleButton from '../CustomToggleButton';
import {saveListing, unsaveListing} from '../../api';
import { toast } from 'react-toastify';

interface ListingProps {
  user: firebase.User | null | undefined;
  userInfo?: any;
  listingId: string;
  title: string;
  price: string;
  postDate: number;
  pictures: string[];
  
}
const Listing: React.FC<ListingProps> = ({title, price, postDate, pictures, userInfo, listingId, user}) => {
  const [show, setShow] = useState(false);
  
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    if(userInfo != null) {
      for (let i = 0; i < userInfo.savedListings.length; i++) {
        if (userInfo.savedListings[i][0] === listingId) {
          setToggled(true);
          break;
        }
      }
    }

  }, []);

  return (
    <div style={{ margin: '5%' }}>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <Carousel className={styles.zIndx} interval={null}>
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
        </div>
        <div className={styles.card_content}>
          <h2 className={styles.card_title}>{title}</h2>
          <p className={styles.card_text}>${price}</p>
          <p className={styles.description}>Posted {new Date(postDate).toDateString()}</p>
          <button onClick = {async () => {setToggled(!toggled)
            if(toggled === true) {
              const successUnsave = await unsaveListing(
                user,
                listingId,
                postDate
              );
            } else {
              const successSave = await saveListing(
                user,
                listingId,
                postDate
              );
              if (successSave) {
                toast('This listing has been added to your Saved collection!');
              } else {
                toast(
                  'There has been an error while adding this to your saved collection. Please try again.',
                );
              }

            }
            
          }
          } 
          className={styles.like_btn}>
                <FontAwesomeIcon icon={faHeart} size="lg" className={toggled ? styles.heartActive : styles.heartInactive} />
          </button>
          {/* <button className={styles.btn}>Contact Seller</button> */}
        </div>
      </div>

      <ViewListing title="Flower Sweatshirt" seller="Sarah A." show={show} setShow={setShow} />
    </div>
  );
};
export default connect()(Listing);