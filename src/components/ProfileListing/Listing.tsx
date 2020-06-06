import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import ViewListing from '../ViewListing/ViewListing';
import { saveListing, unsaveListing } from '../../api';
import styles from './index.module.scss';

interface ListingProps {
  user: firebase.User | null | undefined;
  userInfo?: any;
  listingId: string;
  title: string;
  price: string;
  postDate: number;
  pictures: string[];
  reloadProfile?: Function;
}

const Listing: React.FC<ListingProps> = ({
  title,
  price,
  postDate,
  pictures,
  userInfo,
  listingId,
  user,
  reloadProfile,
}) => {
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(false);
  const [toggled, setToggled] = useState(false);
  function getPictures() {
    return pictures.map((picture) => {
      return (
        <Carousel.Item onClick={() => setShow(true)}>
          <img className={styles.cardImgTop} src={picture} alt="card" />
        </Carousel.Item>
      );
    });
  }
  useEffect(() => {
    if (userInfo != null) {
      for (let i = 0; i < userInfo.savedListings.length; i += 1) {
        if (userInfo.savedListings[i][0] === listingId) {
          setToggled(true);
          break;
        }
      }
    }
    if (reload === true) {
      if (reloadProfile) {
        reloadProfile(true);
      }
      setReload(false);
    }
  }, [reload, listingId, reloadProfile, userInfo]);

  return (
    <div className="hoverPointer" style={{ margin: '5%' }}>
      <div className={styles.card}>
        <div className="cardImage imgWrapper">
          <Carousel className={styles.zIndx} interval={null}>
            {pictures && getPictures()}
          </Carousel>
        </div>
        <div className={styles.card_content}>
          <h2 className={styles.card_title}>{title}</h2>
          <p className={styles.card_text}>
            <span>$</span>
            <span>{price}</span>
          </p>
          <p className={styles.description}>
            <span>Posted </span>
            <span>{new Date(postDate).toDateString().split(' ').slice(1).join(' ')}</span>
          </p>
          <button
            type="submit"
            onClick={async () => {
              setToggled(!toggled);
              if (toggled === true) {
                await unsaveListing(user, listingId, postDate);
              } else {
                const successSave = await saveListing(user, listingId, postDate);
                if (successSave) {
                  toast('This listing has been added to your Saved collection!');
                } else {
                  toast(
                    'There has been an error while adding this to your saved collection. Please try again.',
                  );
                }
              }
            }}
            className={styles.like_btn}
          >
            <FontAwesomeIcon
              icon={faHeart}
              size="lg"
              className={toggled ? styles.heartActive : styles.heartInactive}
            />
          </button>
        </div>
      </div>
      {show && (
        <ViewListing
          reloadListing={setReload}
          listingId={listingId}
          creationTime={postDate}
          show={show}
          setShow={setShow}
        />
      )}
    </div>
  );
};
export default connect()(Listing);
