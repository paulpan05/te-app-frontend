import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import styles from './index.module.scss';
import Listing from '../../components/Listing/Listing';
import Tags from '../../components/Tags';
import Rate from '../../components/RateSeller';
import { rootState } from '../../redux/reducers';
import {
  getUserProfile,
  getListings,
  getListingsBySearch,
  getListingsByTags,
  fetchIdListings,
} from '../../api';
import CreateListing from '../../components/CreateListing';

// Note: as of now there has to be at least 4 things in the database in order for listings to appear
interface HomeProps {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
}
const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const Home: React.FC<HomeProps> = ({ user }) => {
  const [listings, setListings] = useState();
  const [searchListings, setSearchListings] = useState();
  const [userInfo, userInfoSetter] = useState<any>(null);
  const [reloadHome, setReloadHome] = useState(true);
  const [showCreateListing, setShowCreateListing] = useState(false);
  // holds the listing of the listing that needs to be rated
  const [rateListing, rateListingSetter] = useState();
  const [showRateSeller, setShowRateSeller] = useState(false);
  let rowArray: any = [];
  let searchInput = '';
  const dispTags = [
    'Tutoring',
    'Housing',
    'Rideshare',
    'Study Material',
    'Clothes',
    'Furniture',
    'Electronics',
    'Appliances',
    'Fitness',
    'Other',
    'On-Campus Pickup',
    'Off-Campus Pickup',
    'Venmo',
    'Cash',
    'Dining Dollars',
    'Free',
  ];
  const tags = {};
  dispTags.map((tag) => {
    tags[tag] = false;
  });

  const callAPI = useCallback(async () => {
    const userResult = await getUserProfile(user, undefined, userInfoSetter);
    // check if user profile came back valid
    if (userResult !== undefined && userResult !== null) {
      // check if there are any listings that need to be rated
      if (userResult.listingsToRate !== undefined && userResult.listingsToRate.length !== 0) {
        // take the first listing that needs to be rated
        rateListingSetter(userResult.listingsToRate[0]);
        setShowRateSeller(true);
      } else {
        setShowRateSeller(false);
      }
    } else {
      setShowRateSeller(false);
    }
  }, [user]);

  const onKeyPressed = async (e) => {
    if (e.keyCode === 13) {
      if (searchInput.length !== 0) {
        await getListingsBySearch(user, searchInput, setSearchListings);
        setListings(null);
        rowArray = [];
      } else {
        await getListings(user, setListings);
        setSearchListings(null);
        rowArray = [];
      }
    }
  };

  useEffect(() => {
    if (reloadHome === true) {
      callAPI();
      getListings(user, setListings);
      setReloadHome(false);
    }
  }, [callAPI, reloadHome, user]);

  return (
    <div>
      <CreateListing
        show={showCreateListing}
        setShow={setShowCreateListing}
        setReloadHome={setReloadHome}
      />
      <Button className="sellButton" onClick={() => setShowCreateListing(true)}>
        +
      </Button>
      {rateListing && showRateSeller && (
        <Rate
          user={user}
          reloadHome={setReloadHome}
          sellerId={rateListing[2]}
          creationTime={rateListing[1]}
          listingId={rateListing[0]}
        />
      )}
      <Row className="justify-content-md-center">
        <div style={{ zIndex: 0, maxWidth: '100%' }}>
          <Tags
            tags={dispTags}
            setTag={(tag: string, active: boolean) => {
              tags[tag] = active;
            }}
          />
        </div>
      </Row>
      <Row className="justify-content-center">
        <button
          type="submit"
          className={styles.filterButton}
          onClick={async () => {
            const parsedTags = dispTags.filter((tag) => tags[tag]);
            if (parsedTags.length !== 0) {
              const response1 = await getListingsByTags(user, parsedTags);
              const parsedIds: any = [];
              const parsedCreationTimes: any = [];
              // console.log(response1);
              if (response1 !== false) {
                response1.map((listing) => {
                  if (!parsedIds.includes(listing.listingId)) {
                    parsedIds.push(listing.listingId);
                    parsedCreationTimes.push(listing.creationTime);
                  }
                });
                await fetchIdListings(user, setSearchListings, parsedIds, parsedCreationTimes);
                setListings(null);
                rowArray = [];
              } else {
                toast('No Listings exist with those tags yet!');
              }
            } else {
              await getListings(user, setListings);
              setSearchListings(null);
              rowArray = [];
            }
          }}
        >
          Apply Filters
        </button>
      </Row>
      <Row className="justify-content-center">
        <InputGroup className={styles.inputGroup}>
          <FormControl
            className={styles.input}
            onKeyDown={(e) => {
              onKeyPressed(e);
            }}
            type="text"
            placeholder="Search.."
            onChange={(e) => {
              searchInput = e.target.value;
            }}
            name="search"
          />
          <button
            type="submit"
            className={styles.searchButton}
            onClick={async () => {
              if (searchInput.length !== 0) {
                await getListingsBySearch(user, searchInput, setSearchListings);
                setListings(null);
                rowArray = [];
              } else {
                await getListings(user, setListings);
                setSearchListings(null);
                rowArray = [];
              }
            }}
          >
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
        </InputGroup>
      </Row>
      {listings &&
        listings !== null &&
        listings.Items.map((listingItem, index) => {
          if (index % 4 === 0 && index + 3 < listings.Items.length) {
            rowArray.push(
              <Row xs={1} md={2} lg={4}>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={listingItem.listingId}
                    title={listingItem.title}
                    price={listingItem.price}
                    postDate={listingItem.creationTime}
                    pictures={listingItem.pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={listings.Items[index + 1].listingId}
                    title={listings.Items[index + 1].title}
                    price={listings.Items[index + 1].price}
                    postDate={listings.Items[index + 1].creationTime}
                    pictures={listings.Items[index + 1].pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={listings.Items[index + 2].listingId}
                    title={listings.Items[index + 2].title}
                    price={listings.Items[index + 2].price}
                    postDate={listings.Items[index + 2].creationTime}
                    pictures={listings.Items[index + 2].pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={listings.Items[index + 3].listingId}
                    title={listings.Items[index + 3].title}
                    price={listings.Items[index + 3].price}
                    postDate={listings.Items[index + 3].creationTime}
                    pictures={listings.Items[index + 3].pictures}
                  />
                </Col>
              </Row>,
            );
          } else if (listings.Items.length % 4 === 1 && listings.Items.length - 1 === index) {
            rowArray.push(
              <Row xs={1} md={2} lg={4}>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={listingItem.listingId}
                    title={listingItem.title}
                    price={listingItem.price}
                    postDate={listingItem.creationTime}
                    pictures={listingItem.pictures}
                  />
                </Col>
              </Row>,
            );
          } else if (listings.Items.length % 4 === 2 && listings.Items.length - 2 === index) {
            rowArray.push(
              <Row xs={1} md={2} lg={4}>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={listingItem.listingId}
                    title={listingItem.title}
                    price={listingItem.price}
                    postDate={listingItem.creationTime}
                    pictures={listingItem.pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={listings.Items[index + 1].listingId}
                    title={listings.Items[index + 1].title}
                    price={listings.Items[index + 1].price}
                    postDate={listings.Items[index + 1].creationTime}
                    pictures={listings.Items[index + 1].pictures}
                  />
                </Col>
              </Row>,
            );
          } else if (listings.Items.length % 4 === 3 && listings.Items.length - 3 === index) {
            rowArray.push(
              <Row xs={1} md={2} lg={4}>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={listingItem.listingId}
                    title={listingItem.title}
                    price={listingItem.price}
                    postDate={listingItem.creationTime}
                    pictures={listingItem.pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={listings.Items[index + 1].listingId}
                    title={listings.Items[index + 1].title}
                    price={listings.Items[index + 1].price}
                    postDate={listings.Items[index + 1].creationTime}
                    pictures={listings.Items[index + 1].pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={listings.Items[index + 2].listingId}
                    title={listings.Items[index + 2].title}
                    price={listings.Items[index + 2].price}
                    postDate={listings.Items[index + 2].creationTime}
                    pictures={listings.Items[index + 2].pictures}
                  />
                </Col>
              </Row>,
            );
          }
        }) && (
          <Container fluid>
            {rowArray.map((row) => (
              <div>{row}</div>
            ))}
          </Container>
        )}

      {searchListings &&
        searchListings != null &&
        searchListings.map((aListing, index) => {
          if (index % 4 === 0 && index + 3 < searchListings.length) {
            rowArray.push(
              <Row xs={1} md={2} lg={4}>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={aListing.listingId}
                    title={aListing.title}
                    price={aListing.price}
                    postDate={aListing.creationTime}
                    pictures={aListing.pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={searchListings[index + 1].listingId}
                    title={searchListings[index + 1].title}
                    price={searchListings[index + 1].price}
                    postDate={searchListings[index + 1].creationTime}
                    pictures={searchListings[index + 1].pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={searchListings[index + 2].listingId}
                    title={searchListings[index + 2].title}
                    price={searchListings[index + 2].price}
                    postDate={searchListings[index + 2].creationTime}
                    pictures={searchListings[index + 2].pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={searchListings[index + 3].listingId}
                    title={searchListings[index + 3].title}
                    price={searchListings[index + 3].price}
                    postDate={searchListings[index + 3].creationTime}
                    pictures={searchListings[index + 3].pictures}
                  />
                </Col>
              </Row>,
            );
          } else if (searchListings.length % 4 === 1 && searchListings.length - 1 === index) {
            rowArray.push(
              <Row xs={1} md={2} lg={4}>
                <Listing
                  reloadHome={setReloadHome}
                  user={user}
                  listingId={aListing.listingId}
                  title={aListing.title}
                  price={aListing.price}
                  postDate={aListing.creationTime}
                  pictures={aListing.pictures}
                />
              </Row>,
            );
          } else if (searchListings.length % 4 === 2 && searchListings.length - 2 === index) {
            rowArray.push(
              <Row xs={1} md={2} lg={4}>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={aListing.listingId}
                    title={aListing.title}
                    price={aListing.price}
                    postDate={aListing.creationTime}
                    pictures={aListing.pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={searchListings[index + 1].listingId}
                    title={searchListings[index + 1].title}
                    price={searchListings[index + 1].price}
                    postDate={searchListings[index + 1].creationTime}
                    pictures={searchListings[index + 1].pictures}
                  />
                </Col>
              </Row>,
            );
          } else if (searchListings.length % 4 === 3 && searchListings.length - 3 === index) {
            rowArray.push(
              <Row xs={1} md={2} lg={4}>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={aListing.listingId}
                    title={aListing.title}
                    price={aListing.price}
                    postDate={aListing.creationTime}
                    pictures={aListing.pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={searchListings[index + 1].listingId}
                    title={searchListings[index + 1].title}
                    price={searchListings[index + 1].price}
                    postDate={searchListings[index + 1].creationTime}
                    pictures={searchListings[index + 1].pictures}
                  />
                </Col>
                <Col>
                  <Listing
                    reloadHome={setReloadHome}
                    user={user}
                    listingId={searchListings[index + 2].listingId}
                    title={searchListings[index + 2].title}
                    price={searchListings[index + 2].price}
                    postDate={searchListings[index + 2].creationTime}
                    pictures={searchListings[index + 2].pictures}
                  />
                </Col>
              </Row>,
            );
          }
        }) && (
          <Container fluid>
            {rowArray.map((row) => (
              <div>{row}</div>
            ))}
          </Container>
        )}
    </div>
  );
};

export default connect(mapStateToProps)(Home);
