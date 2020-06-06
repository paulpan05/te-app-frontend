import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import ViewListing from '../ViewListing/ViewListing';
import { saveListing, unsaveListing, getUserProfile } from '../../api';

interface ListingProps {
  user: firebase.User | null | undefined;
  listingId: string;
  title: string;
  price: string;
  postDate: number;
  pictures: string[];
  instantChange?: Function;
  reloadHome?: Function;
}

const Listing: React.FC<ListingProps> = ({
  instantChange,
  title,
  price,
  postDate,
  pictures,
  listingId,
  user,
  reloadHome,
}) => {
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(false);

  function getPictures() {
    return pictures.map((picture) => {
      return (
        <Carousel.Item onClick={() => setShow(true)}>
          <img className={styles.cardImgTop} src={picture} alt="listing" />
        </Carousel.Item>
      );
    });
  }

  const [toggled, setToggled] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    const userInfoResult = await getUserProfile(user);
    if (userInfoResult !== undefined) {
      for (let i = 0; i < userInfoResult.savedListings.length; i += 1) {
        if (userInfoResult.savedListings[i][0] === listingId) {
          setToggled(true);
          break;
        }
      }
    }
  }, [listingId, user]);
  useEffect(() => {
    fetchUserProfile();
    if (reload === true) {
      if (reloadHome) {
        reloadHome(true);
      }
      setReload(false);
    }
  }, [reload, fetchUserProfile, reloadHome]);

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
              setToggled(!toggled)
              if (toggled === true) {
                const successUnsave = await unsaveListing(user, listingId, postDate);
                if (successUnsave) {
                  if (instantChange) {
                    instantChange();
                  }
                  toast('This listing has been removed from your Saved collection!');
                } else {
                  toast(
                    'There has been an error while removing this from your saved collection. Please try again.',
                  );
                }
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
          reloadHome={reloadHome}
          reloadListing={setReload}
          instantChange={instantChange}
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
