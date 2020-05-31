import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, FormLabel, Image } from 'react-bootstrap';
import {fetchListings,getUserProfile} from '../../api/index';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import styles from './index.module.scss';
import { rootState } from '../../redux/reducers';
import Listing from '../../components/ProfileListing/Listing';
import { ReportUser } from '../../components/ReportModals';
import EditProfile from '../../components/EditProfile/index';
import ContactSeller from '../../components/ContactSeller';
interface ProfileProps {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
  targetUserId: string | undefined;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const Profile: React.FC<ProfileProps> = ({ user, targetUserId, dispatch}) => {
  const [profile, setProfile] = useState<any>()
  const [userEquals, setUserEquals] = useState(false);
  const getAndSetProfile = async () => {
    const result = await getUserProfile(user, targetUserId);
    console.log(result)
    setProfile(result)
    console.log(result)
    return result;
  }
  const functionHandler= async () =>{
    const result = await getAndSetProfile();
    console.log(result)
    await availListings(result);
    await soldListings(result);
    await boughtListings(result);
  }
  const [availArray,setAvailArray]=useState<any>()
  const [boughtArray,setBoughtArray]=useState<any>()
  const [soldArray,setSoldArray]=useState<any>()
  const availListings = async (result: any)=>{
    let listings;
    const listingArray=[] as any;
    const ids = new Array();
    const creationTimes = new Array();
    if (result.activeListings.length===0) {
      return;
    }
    for (let k=0; k<result.activeListings.length; k++) {
      ids.push(result.activeListings[k][0]);
      creationTimes.push(result.activeListings[k][1]);
    }
    listings = await fetchListings(user, ids, creationTimes)
    if (listings) {listings.map((listing) => {
      listingArray.push(<Listing user={listing.user} title={listing.title} postDate={listing.creationTime} pictures={listing.pictures} price={listing.price} listingId={listing.listingId}/>);
    })
	
    setAvailArray(listingArray);
	}
    }
  const soldListings = async (result: any) => {
      let listings;
      const listingArray=[] as any;
      const ids = new Array()
      const creationTimes = new Array()
      if(result.soldListings.length===0){
        return;
      }
      console.log(result.soldListings)
      for(let k=0; k<result.soldListings.length; k++){
        ids.push(result.soldListings[k][0]);
        creationTimes.push(result.soldListings[k][1]);
      }
      listings = await fetchListings(user, ids, creationTimes)
     
      listings.map((listing)=>{
        listingArray.push(<Listing user={listing.user} title={listing.title} postDate={listing.creationTime} pictures={listing.picture} price={listing.price} listingId={listing.listingId}/>);
      })
      setSoldArray(listingArray);
      }
  const boughtListings = async (result: any)=>{
        let listings;
        const listingArray=[] as any;
        const ids = new Array()
        const creationTimes = new Array()
        if(result.boughtListings.length===0){
          return;
        }
        console.log(result.boughtListings)
        for(let k=0; k<result.boughtListings.length; k++){
          ids.push(result.boughtListings[k][0]);
          creationTimes.push(result.boughtListings[k][1]);
        }
        listings = await fetchListings(user, ids, creationTimes)
       
        listings.map((listing)=>{
          listingArray.push(<Listing user={listing.user} title={listing.title} postDate={listing.creationTime} pictures={listing.picture} price={listing.price} listingId={listing.listingId}/>);
        })
        setBoughtArray(listingArray);
        }
  useEffect(() => {
    if(targetUserId===undefined){
      setUserEquals(true)
    }
    functionHandler();
  }, [])
  const [showReportUser, setShowReportUser] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [contactSeller, contactSellerSetter] = useState(false);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
  document.body.style.minHeight = '100%';
  return profile ? (
    <>
      <EditProfile show={showEditProfile} setShow={setShowEditProfile} phoneProp={profile?.phone} pictureProp={profile?.picture} nameProp={profile?.name} />
      <ContactSeller showPopup={contactSeller} setter={contactSellerSetter} sellerInfo={profile} />

      <Container className={styles.con} fluid>
        <div className="min-vh-100">
          <Row>
            <Col lg={5} xl={3} className={styles.column}>
              <div>
                <Image src={profile?.picture} roundedCircle alt="profile" className={styles.img} fluid />
              </div>
              <div>
                <Box>
                <Rating name="read-only" value={ (() => {
                  let sum = 0 ;
                  console.log(profile?.ratings)
                  if(profile?.ratings.length===0){
                    return 0
                  }
                  for(let i=0;i<(profile?.ratings).length;i++){
                    sum+=profile?.ratings[i]
                  }
                  return Math.floor(sum/(profile?.ratings).length)})()
                  } readOnly />
                </Box>
              </div>
              {userEquals?(<>
                <Button variant="outline-primary" className={styles.btnblue} onClick={() => setShowEditProfile(true)}>
                  Edit Profile
                </Button></> ):(<>
              <Button variant="outline-primary" className={styles.btnblue} onClick={()=>contactSellerSetter(true)}>
                Contact Seller
              </Button>
              <Button
                variant="outline-secondary"
                className={styles.btngrey}
                onClick={() => setShowReportUser(true)}>
                Report Seller
              </Button>
                {targetUserId && <ReportUser show={showReportUser} setShow={setShowReportUser} reportedUserId={targetUserId} reportedUserName={profile.name}/>}</>)}
            </Col>
            <Col lg={7} xl={9}>
              <h2 style={{ textAlign: 'center' }}>
                {profile?.name}
              </h2>
              <Row className={styles.row}>
                <div className={styles.outlin}>
                  <p style={{ marginBottom: '0rem', marginLeft: '1rem' }}>Available Listings</p>
                  {availArray && <Carousel className={styles.car} responsive={responsive}>
                {availArray}
                </Carousel>}
                </div>
              </Row>
              </Col>
              </Row>
          <Row>
            <Col lg={5} xl={3} className={styles.column}></Col>
            <Col lg={7} xl={9}>
              <Row className={styles.row}>
                <div className={styles.outlin}>
                  {userEquals?(<><p style={{ marginBottom: '0rem', marginLeft: '1rem' }}>Past Transactions</p>
                  {(soldArray || boughtArray) && <Carousel className={styles.car} responsive={responsive}>
                    {(()=>{
                      if(soldArray===undefined){
                        return boughtArray
                      }
                      else if(boughtArray===undefined){
                        return soldArray
                      }
                      else{
                        return soldArray.concat(boughtArray)
                      }
                    })()}                
               </Carousel>}</>
                ):(
                <><p style={{ marginBottom: '0rem', marginLeft: '1rem' }}>Past Listings</p>
                  {soldArray && <Carousel className={styles.car} responsive={responsive}>
                    {soldArray}
                  </Carousel>}
                  </>)}
                </div>
              </Row>
            </Col>
          </Row>
          
        
        </div>
      </Container>
    </>
  ):(<></>);

};

export default connect(mapStateToProps)(Profile);