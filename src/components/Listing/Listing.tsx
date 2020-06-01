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
  instantChange?: Function;
  lastSaved?: any;
  reloadHome?: Function;
}

const Listing: React.FC<ListingProps> = ({lastSaved, instantChange, title, price, postDate, pictures, userInfo, listingId, user, reloadHome}) => {
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(false);

  function getPictures() {
    return pictures.map((picture) => {
      return (
      <Carousel.Item onClick={() => setShow(true)}>
        <img onClick={() => setShow(true)} className={styles.cardImgTop} src={picture} />
      </Carousel.Item>
      )
    })
  }
  const [toggled, setToggled] = useState(false);
    useEffect(() => {
    //console.log(instant)
    if(userInfo != null && !lastSaved && instantChange) {
      for (let i = 0; i < userInfo.savedListings.length; i++) {
        if (userInfo.savedListings[i][0] === listingId) {
          setToggled(true);
          break;
        }
      }
    }
    if (reload===true) {
      if (reloadHome) {
        reloadHome(true);
      }
      setReload(false);
    }

  }, [reload]);

  return (
    <div className="hoverPointer" style={{ margin: '5%' }}>
      <div className={styles.card}>
        <div className="cardImage imgWrapper">
          <Carousel className={styles.zIndx} interval={null}>
            {getPictures()}
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
              if (successUnsave) {
                if(instantChange){
                  instantChange();
                }
                toast('This listing has been removed from your Saved collection!');
              } else {
                toast(
                  'There has been an error while removing this from your saved collection. Please try again.',
                );
              }
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
        </div>
      </div>
      
      {show && (
        <ViewListing reloadHome={reloadHome? reloadHome : undefined} reloadListing={setReload} instantChange={instantChange} listingId={listingId} creationTime={postDate} show={show} setShow={setShow} />
      )}
    </div>
  );
};
export default connect()(Listing);
