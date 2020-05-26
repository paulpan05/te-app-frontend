import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { rootState } from '../../redux/reducers';
import { authActions } from '../../redux/actions';
import styles from './index.module.scss';
import example from '../../assets/img/bag.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, FormLabel, FormText, FormFile } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Listing from '../../components/Listing/Listing';
interface ProfileProps {
    dispatch: Dispatch<any>;
    user: firebase.User | null | undefined;
}

const mapStateToProps = (state: rootState) => ({
    user: state.auth.user,
  });
  
const Profile: React.FC<ProfileProps> = ({ user, dispatch }) => {
    const [profileImgSrc, setProfileImgSrc] = useState((user && user.photoURL) ? user.photoURL : example);
    const [starValue, setStarValue] = React.useState<number | null>(2);
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    document.body.style.padding = "0px";
    return (
    <Container className={styles.con}>
        <Row>
            <Col xs={3} className={styles.column}>
                
                <FormLabel>
                <Image src={profileImgSrc} roundedCircle alt="profile" className={styles.img} fluid/>
                <FormText>Click to Select a Profile Picture</FormText>
                <FormFile
                id="upload-profile"
                accept="image/*"
                hidden={ true }
                onChange={(e: any) => {
                    if (e.target.files && e.target.files.length === 1 && e.target.files[0]) {
                    URL.revokeObjectURL(profileImgSrc);
                    setProfileImgSrc(URL.createObjectURL(e.target.files[0]));
                    }
                }}/>
                </FormLabel>
                <div>
                    <Box>
                        <Rating
                            name="simple-controlled"
                            value={starValue}
                            onChange={(event, newValue) => {
                                setStarValue(newValue);
                        }}/>
                    </Box>
                </div>
                <Button variant="outline-primary" className={styles.btnblue}>Contact Seller</Button>{' '}
                <Button variant="outline-secondary" className={styles.btngrey}>Edit Profile</Button>{' '}
            </Col>
            <Col xs={9}>
                <h2 style={{ textAlign: 'center'}}>{user?user.displayName:"Name cannot be rendered: error occurred"}</h2>
                <Row className={styles.row}>
                    <div className={styles.outlin}>
                        <p style={{marginBottom: "0rem", marginLeft:"1rem"}}>Available Listings</p>
                        <Carousel className={styles.car} responsive={responsive}>
                            <Listing/>
                            <Listing/>
                            <Listing/>
                            <Listing/>
                            <Listing/>
                            <Listing/>
                        </Carousel>
                    </div>  
                </Row> 
                <Row className={styles.row}>
                    <div className={styles.outlin}>
                        <p style={{marginBottom: "0rem", marginLeft:"1rem"}}>Past Transactions</p>
                        <Carousel className={styles.car} responsive={responsive}>
                            <Listing/>
                            <Listing/>
                            <Listing/>
                            <Listing/>
                            <Listing/>
                            <Listing/>
                        </Carousel>
                    </div>  
                </Row>  
                
            </Col>
        </Row>
    </Container>
    )
};
    
export default connect(mapStateToProps)(Profile);