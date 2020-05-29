import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import OpenPopup from '../../components/openPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditListing from '../../components/editListing';
import FlowerImg from '../../assets/GreenShirt.png';
import styles from './index.module.scss';
import Listing from '../../components/Listing/Listing';
import Carousel from 'react-multi-carousel';
import TagButton from '../../components/Button';
import Tags from '../../components/Tags';
import Rate from '../../components/RateSeller';

import { rootState } from '../../redux/reducers';
import endpoint from '../../configs/endpoint';
import { getUserProfile, userSignup, updateProfile, getListings, getListingsBySearch, getListingsByTags, createListing, fetchIdListings} from '../../api';

// Note: as of now there has to be at least 4 things in the database in order for listings to appear
interface HomeProps {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
}
const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const Home: React.FC<HomeProps> = ({ dispatch, user }) => {
  const [listings, setListings] = useState();
  const[searchListings, setSearchListings] = useState();
  const [userInfo, userInfoSetter] = useState<any>(null);
  let rowArray = new Array();
  let searchInput;
  const [tagStates, setTagStates] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])

  useEffect(() => {
         getUserProfile(user, userInfoSetter);
         getListings(user, setListings);
  }, [user]);

  return (
    <div>
      <Rate />
      {listings && <button onClick={() => {console.log(listings.Items.length);}}>Click Me</button>}
      <button
      onClick={async () => {
        await userSignup(user, "4086434569", "Aarushi","a3shah@ucsd.edu","Aarushi.png");
      }}
      type="submit"
    >
      Post User
    </button>
    <button
      type="submit"
      onClick={async () => {
        await getUserProfile(user, userInfoSetter);
      }}
    >
      Fetch User
    </button>
    <button
      type="submit"
      onClick={async () => {
        await updateProfile(user, "408643459", "Aarushi.png", "Aarushi");
      }}
    >
      Edit Profile
    </button>
    <button
      type="submit"
      onClick={async () => {
        await getListings(user, setListings);
      }}
    >
      Fetch Listings
    </button>
    <button
      type="submit"
      onClick={async () => {
        await getListingsByTags(user, ["Rides", "Clothes"]);
      }}
    >
      Fetch Listings By Tags
    </button>
    <button
      type="submit"
      onClick={async () => {
        await getListingsBySearch(user, "title", setListings);
      }}
    >
      Fetch Listings By Search
    </button>
    <button
      type="submit"
      onClick={async () => {
        await createListing(user, "Red Dress", 30, "Red Dress", "Price Center", ["Clothes"], []);
      }}
    >
      Create Listing
    </button>
      <Row className="justify-content-md-center">
        <Tags/>
      </Row>
      <Row className="justify-content-md-center">
        <InputGroup>
          <FormControl className={styles.input} type="text" placeholder="Search.." onChange={(e) => {searchInput = e.target.value}} name="search" />
          <button className={styles.searchButton}  onClick={async () => { if(searchInput.length != 0) {await getListingsBySearch(user, searchInput, setSearchListings); setListings(null); rowArray = new Array(); } else {await getListings(user, setListings); setSearchListings(null); rowArray = new Array();}}}>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button> 
        </InputGroup>
      </Row>

      {/* <Form>
     <Form.Control className="mr-sm-2" type="text" placeholder="Search for an Item" />
     </Form> */}
      {listings && listings !== null && listings.Items.map(
(listingItem, index) => {
  if(index % 4 === 0 && index + 3 < listings.Items.length) {
    rowArray.push (<Row xs={1} md={2} lg={4}>
      <Col>
      <Listing user={user} userInfo={userInfo} listingId={listingItem.listingId} title={listingItem.title === null ? "No Name" : listingItem.title  } price={listingItem.price} postDate={listingItem.creationTime} pictures={listingItem.pictures}/>
      </Col>
      <Col>
      <Listing user={user} userInfo={userInfo} listingId={listings.Items[index + 1].listingId} title={listings.Items[index + 1].title} price={listings.Items[index + 1].price} postDate={listings.Items[index + 1].creationTime} pictures={listings.Items[index + 1].pictures}/>
      </Col>
      <Col>
      <Listing user={user} userInfo={userInfo} listingId={listings.Items[index + 2].listingId} title={listings.Items[index + 2].title} price={listings.Items[index + 2].price} postDate={listings.Items[index + 2].creationTime} pictures={listings.Items[index + 2].pictures}/>
      </Col>
      <Col>
      <Listing user={user} userInfo={userInfo} listingId={listings.Items[index + 3].listingId}  title={listings.Items[index + 3].title === null ? "No Name": listingItem.title } price={listings.Items[index + 3].price} postDate={listings.Items[index + 3].creationTime} pictures={listings.Items[index + 3].pictures}/>
      </Col>
    </Row>)
  }
}) && <Container fluid>{rowArray.map((row) => <div>{row}</div>)}</Container>}


{searchListings && searchListings != null &&  searchListings.map((aListing, index) => {
      if(index % 4 === 0 && index + 3 < searchListings.length) {
        rowArray.push (<Row xs={1} md={2} lg={4}>
          <Col>
          <Listing user={user} userInfo={userInfo} listingId={aListing.listingId} title={aListing.title} price={aListing.price} postDate={aListing.creationTime} pictures={aListing.pictures}/>          </Col>
          <Col>
          <Listing user={user} userInfo={userInfo} listingId={searchListings[index + 1].listingId} title={searchListings[index + 1].title} price={searchListings[index + 1].price} postDate={searchListings[index + 1].creationTime} pictures={searchListings[index + 1].pictures}/>
          </Col>
          <Col>
          <Listing user={user} userInfo={userInfo} listingId={searchListings[index + 2].listingId} title={searchListings[index + 2].title} price={searchListings[index + 2].price} postDate={searchListings[index + 2].creationTime} pictures={searchListings[index + 2].pictures}/>
          </Col>
          <Col>
          <Listing user={user} userInfo={userInfo} listingId={searchListings[index + 3].listingId} title={searchListings[index + 3].title} price={searchListings[index + 3].price} postDate={searchListings[index + 3].creationTime} pictures={searchListings[index + 3].pictures}/>
          </Col>
          </Row>)
        } else if(searchListings.length % 4 === 1 && searchListings.length - 1 === index) {
        rowArray.push(
        <Row xs={1} md={2} lg={4}>
             <Listing user={user} userInfo={userInfo} listingId={aListing.listingId} title={aListing.title} price={aListing.price} postDate={aListing.creationTime} pictures={aListing.pictures}/>
        </Row>)
      } else if(searchListings.length % 4 === 2 && searchListings.length - 2 === index) {
        rowArray.push(
        <Row xs={1} md={2} lg={4}>
             <Listing user={user} userInfo={userInfo} listingId={aListing.listingId} title={aListing.title} price={aListing.price} postDate={aListing.creationTime} pictures={aListing.pictures}/>
             <Listing user={user} userInfo={userInfo} listingId={searchListings[index + 1].listingId} title={searchListings[index + 1].title} price={searchListings[index + 1].price} postDate={searchListings[index + 1].creationTime} pictures={searchListings[index + 1].pictures}/>
        </Row>)
      } else if(searchListings.length % 4 === 3 && searchListings.length - 3 === index) {
        rowArray.push(
        <Row xs={1} md={2} lg={4}>
              <Col>
             <Listing user={user} userInfo={userInfo} listingId={aListing.listingId} title={aListing.title} price={aListing.price} postDate={aListing.creationTime} pictures={aListing.pictures}/>
             </Col>
             <Col>
             <Listing user={user} userInfo={userInfo} listingId={searchListings[index + 1].listingId} title={searchListings[index + 1].title} price={searchListings[index + 1].price} postDate={searchListings[index + 1].creationTime} pictures={searchListings[index + 1].pictures}/>
             </Col>
             <Col>
             <Listing user={user} userInfo={userInfo} listingId={searchListings[index + 2].listingId} title={searchListings[index + 2].title} price={searchListings[index + 2].price} postDate={searchListings[index + 2].creationTime} pictures={searchListings[index + 2].pictures}/>
             </Col>
        </Row>)
      }
    }
    ) && <Container fluid>{rowArray.map((row) => <div>{row}</div>)}</Container>}


      {/* Placeholder listings, Can be deleted  */}
      <Container fluid>
        <Row xs={1} md={2} lg={4}>
          <Col>
            <Listing user={user} userInfo={userInfo} listingId={"123456"} title={"Green Shirt"} price={"$50"} postDate={1231} pictures={[]}/>
          </Col>
          <Col>
            <Listing user={user} userInfo={userInfo} listingId={"123456"} title={"Green Shirt"} price={"$50"} postDate={1231} pictures={[]}/>
          </Col>
          <Col>
            <Listing user={user} userInfo={userInfo} listingId={"123456"} title={"Green Shirt"} price={"$50"} postDate={1231} pictures={[]}/>
          </Col>
          <Col>
            <Listing user={user} userInfo={userInfo} listingId={"123456"} title={"Green Shirt"} price={"$50"} postDate={1231} pictures={[]}/>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={4}>
          <Col>
            <Listing user={user} userInfo={userInfo} listingId={"123456"} title={"Green Shirt"} price={"$50"} postDate={1231} pictures={[]}/>  
          </Col>
          <Col>
            <Listing user={user} userInfo={userInfo} listingId={"123456"} title={"Green Shirt"} price={"$50"} postDate={1231} pictures={[]}/>
          </Col>
          <Col>
            <Listing user={user} userInfo={userInfo} listingId={"123456"} title={"Green Shirt"} price={"$50"} postDate={1231} pictures={[]}/>
          </Col>
          <Col>
            <Listing user={user} userInfo={userInfo} listingId={"123456"} title={"Green Shirt"} price={"$50"} postDate={1231} pictures={[]}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(mapStateToProps)(Home);
