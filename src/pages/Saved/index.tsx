import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import OpenPopup from '../../components/openPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlowerImg from '../../assets/GreenShirt.png';
import styles from './index.module.scss';
import Listing from '../../components/Listing/Listing';
import TagButton from '../../components/Button';
import Tags from '../../components/Tags';
import {getUserProfile, fetchIdListings} from '../../api';
import { rootState } from '../../redux/reducers';

interface SavedProps {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const Saved: React.FC<SavedProps> = ({ dispatch, user }) => {
  const [listings, setListings] = useState();
  const [userInfo, userInfoSetter] = useState<any>(null);
  const ids = new Array();
  const creations = new Array();
  const rowArray = new Array();

   const callAPI = async () => {

    const userProfile = await getUserProfile(user, undefined, userInfoSetter);
    console.log(userProfile);

    userProfile.savedListings.map((listing) => {
        console.log(listing[0]);
        ids.push(listing[0]);
        creations.push(listing[1]);
    });
    if(ids.length != 0) {
      const savedListings = await fetchIdListings(user, setListings, ids, creations);
    }
   
      
   };

  useEffect(() => {
    callAPI();
}, [user]);


  return (
  <div>
    <h1 className={styles.title}>Saved Listings</h1>
    {listings == null && <h2>No Saved Listings!</h2>}
    {listings && listings.map((aListing, index) => {
      if(index % 4 === 0 && index + 3 < listings.length) {
        rowArray.push (<Row xs={1} md={2} lg={4}>
          <Col>
          <Listing user={user} userInfo={userInfo} listingId={aListing.listingId} title={aListing.title} price={aListing.price} postDate={aListing.creationTime} pictures={aListing.pictures}/>          </Col>
          <Col>
          <Listing user={user} userInfo={userInfo} listingId={listings[index + 1].listingId} title={listings[index + 1].title} price={listings[index + 1].price} postDate={listings[index + 1].creationTime} pictures={listings[index + 1].pictures}/>
          </Col>
          <Col>
          <Listing user={user} userInfo={userInfo} listingId={listings[index + 2].listingId} title={listings[index + 2].title} price={listings[index + 2].price} postDate={listings[index + 2].creationTime} pictures={listings[index + 2].pictures}/>
          </Col>
          <Col>
          <Listing user={user} userInfo={userInfo} listingId={listings[index + 3].listingId} title={listings[index + 3].title} price={listings[index + 3].price} postDate={listings[index + 3].creationTime} pictures={listings[index + 3].pictures}/>
          </Col>
          </Row>)
        } else if(listings.length % 4 === 1 && listings.length - 1 === index) {
        rowArray.push(
        <Row xs={1} md={2} lg={4}>
             <Listing user={user} userInfo={userInfo} listingId={aListing.listingId} title={aListing.title} price={aListing.price} postDate={aListing.creationTime} pictures={aListing.pictures}/>
        </Row>)
      } else if(listings.length % 4 === 2 && listings.length - 2 === index) {
        rowArray.push(
        <Row xs={1} md={2} lg={4}>
             <Listing user={user} userInfo={userInfo} listingId={aListing.listingId} title={aListing.title} price={aListing.price} postDate={aListing.creationTime} pictures={aListing.pictures}/>
             <Listing user={user} userInfo={userInfo} listingId={listings[index + 1].listingId} title={listings[index + 1].title} price={listings[index + 1].price} postDate={listings[index + 1].creationTime} pictures={listings[index + 1].pictures}/>
        </Row>)
      } else if(listings.length % 4 === 3 && listings.length - 3 === index) {
        rowArray.push(
        <Row xs={1} md={2} lg={4}>
              <Col>
             <Listing user={user} userInfo={userInfo} listingId={aListing.listingId} title={aListing.title} price={aListing.price} postDate={aListing.creationTime} pictures={aListing.pictures}/>
             </Col>
             <Col>
             <Listing user={user} userInfo={userInfo} listingId={listings[index + 1].listingId} title={listings[index + 1].title} price={listings[index + 1].price} postDate={listings[index + 1].creationTime} pictures={listings[index + 1].pictures}/>
             </Col>
             <Col>
             <Listing user={user} userInfo={userInfo} listingId={listings[index + 2].listingId} title={listings[index + 2].title} price={listings[index + 2].price} postDate={listings[index + 2].creationTime} pictures={listings[index + 2].pictures}/>
             </Col>
        </Row>)
      }
    }
    ) && <Container fluid>{rowArray.map((row) => <div>{row}</div>)}</Container>}
  </div>
  );
};
export default connect(mapStateToProps)(Saved);
