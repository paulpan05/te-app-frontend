import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, FormLabel, FormText, FormFile, Image } from 'react-bootstrap';
import {fetchListing,getUserProfile} from '../../api/index';
// @ts-ignore
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import example from '../../assets/img/bag.jpg';
import styles from './index.module.scss';
import { authActions } from '../../redux/actions';
import { rootState } from '../../redux/reducers';
import Listing from '../../components/ProfileListing/Listing';
import { ReportUser } from '../../components/ReportModals';

interface ProfileProps {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
  targetUserId: string | undefined;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});


const Profile: React.FC<ProfileProps> = ({ user, targetUserId, dispatch }) => {
  const[profile, setProfile] = useState<any>()
  const [userEquals, setUserEquals] = useState(false);
  const getAndSetProfile = async () => {
    const result = await getUserProfile(user, targetUserId);
    setProfile(result)
  }
  useEffect(() => {
    if(targetUserId!==undefined){
      setUserEquals(true)
    }
    getAndSetProfile();
  }, [])
  const [listingObj, setListingObj] = useState<any>(null)
  const [show, setShow] = useState(false);
  const ids= new Array()
  const creationTimes= new Array()

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  document.body.style.padding = '0px';
  return profile?(
    <Container className={styles.con}>
      <Row>
        <Col xs={3} className={styles.column}>
          <FormLabel>
            <Image src={profile?.picture} roundedCircle alt="profile" className={styles.img} fluid />
          </FormLabel>
          <div>
            <Box>
            <Rating name="read-only" value={ (() => {
              let sum = 0 ;
              for(let i=0;i<(profile?.ratings).length;i++){
                sum+=profile?.ratings[i]
              }
              return Math.floor(sum/(profile?.ratings).length)})()
              } readOnly />
            </Box>
          </div>
          {userEquals?(<>
            <Button variant="outline-primary" className={styles.btnblue}>
              Edit Profile
            </Button></> ):(<>
          <Button variant="outline-primary" className={styles.btnblue}>
            Contact Seller
          </Button>
          <Button
            variant="outline-secondary"
            className={styles.btngrey}
            onClick={() => setShow(true)}>
            Report Seller
          </Button>
          <ReportUser show={show} setShow={setShow} /></>)}  
        </Col>
        <Col xs={9}>
          <h2 style={{ textAlign: 'center' }}>
            {profile?.name}
          </h2>
          <Row className={styles.row}>
            <div className={styles.outlin}>
              <p style={{ marginBottom: '0rem', marginLeft: '1rem' }}>Available Listings</p>
              <Carousel className={styles.car} responsive={responsive}>
                {()=>{
                for(let k=0; k<(profile?.activeListings).length; k++){
                  ids.push(profile?.activeListings[k][0]);
                  creationTimes.push(profile?.activeListings[k][0]);
                }
                fetchListing(user, setListingObj, ids, creationTimes)
                listingObj.map((listing)=>{
                  <Listing user={listing.user} title={listing.title} postDate={listing.creationTime} pictures={listing.picture} price={listing.price}/>
                })}}
              </Carousel>
            </div>
          </Row>
          <Row className={styles.row}>
            <div className={styles.outlin}>
              <p style={{ marginBottom: '0rem', marginLeft: '1rem' }}>Past Transactions</p>
              <Carousel className={styles.car} responsive={responsive}>
                <Listing />
                <Listing />
                <Listing />
                <Listing />
                <Listing />
                <Listing />
              </Carousel>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  ):(<></>);

};

export default connect(mapStateToProps)(Profile);