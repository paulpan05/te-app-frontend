import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, FormLabel, FormText, FormFile } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { CardDeck } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './Card'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import example from '../../assets/img/bag.jpg';
import styles from './index.module.scss';
import { authActions } from '../../redux/actions';
import { rootState } from '../../redux/reducers';

interface ProfileProps {
  dispatch: Dispatch<any>;
  user: firebase.User | null | undefined;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const Profile: React.FC<ProfileProps> = ({ user, dispatch }) => {
  const [profileImgSrc, setProfileImgSrc] = useState(
    user && user.photoURL ? user.photoURL : example,
  );
  const [starValue, setStarValue] = React.useState<number | null>(2);
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
  return (
    <Container className={styles.con}>
      <Row>
        <Col className={styles.column}>
            <FormLabel>
            <Image src={profileImgSrc} roundedCircle alt="profile" className={styles.img} fluid />
            <FormText>Click to Select a Profile Picture</FormText>
            <FormFile
                id="upload-profile"
                accept="image/*"
                hidden
                onChange={(e: any) => {
                if (e.target.files && e.target.files.length === 1 && e.target.files[0]) {
                  URL.revokeObjectURL(profileImgSrc);
                  setProfileImgSrc(URL.createObjectURL(e.target.files[0]));
                }
              }}
              />
          </FormLabel>
            <div>
            <Box>
                <Rating
                    name="simple-controlled"
                    value={starValue}
                    onChange={(event, newValue) => {
                  setStarValue(newValue);
                }}
                  />
              </Box>
          </div>
            <Button variant="outline-primary" className={styles.btnblue}>
            Contact Seller </Button>
            {' '}
            <Button variant="outline-secondary" className={styles.btngrey}>
            Report Seller </Button>
            {' '}
          </Col>
        <Col xs={9}>
            <h2 style={{ textAlign: 'center' }}>
            {user ? user.displayName : 'Name cannot be rendered: error occurred'}
          </h2>
            <Row className={styles.row}>
            <div className={styles.outlin}>
                <h4 style={{paddingLeft: '2vh', marginTop: '1vh'}}>Available Listings</h4>
                <Carousel className={styles.car} responsive={responsive}>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </Carousel>
              </div>
          </Row>
            <Row className={styles.row}>
            <div className={styles.outlin}>
                <h4 style={{paddingLeft: '2vh', marginTop: '1vh'}}>Past Listings</h4>
                <Carousel className={styles.car} responsive={responsive}>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </Carousel>
              </div>
          </Row>
          </Col>
      </Row>
    </Container>
  );

  /*
    <Row className={styles.row}>  
                <div className={styles.outlin}>
                        <h4 style={{paddingLeft: '2vh', marginTop: '3vh'}}>Past Listings</h4>
                        <CardDeck className={styles.carddeck}>
                                <Card className={styles.card}>
                                    <Card.Img variant="top" src={example} className={styles.cardim} />
                                    <Card.Body className={styles.cardbod}>
                                    <Card.Title className={styles.cardtitle}>Card Title</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className={styles.card}>
                                    <Card.Img variant="top" src={example} className={styles.cardim} />
                                    <Card.Body className={styles.cardbod}>
                                    <Card.Title className={styles.cardtitle}>Card Title</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className={styles.card}>
                                    <Card.Img variant="top" src={example} className={styles.cardim} />
                                    <Card.Body className={styles.cardbod}>
                                    <Card.Title className={styles.cardtitle}>Card Title</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className={styles.card}>
                                    <Card.Img variant="top" src={example} className={styles.cardim} />
                                    <Card.Body className={styles.cardbod}>
                                    <Card.Title className={styles.cardtitle}>Card Title</Card.Title>
                                    </Card.Body>
                                </Card> 
                        </CardDeck> 
                    </div>
                </Row>
    CardDeck className={styles.carddeck}>
                                <Card className={styles.card}>
                                    <Card.Img variant="top" src={example} className={styles.cardim} />
                                    <Card.Body className={styles.cardbod}>
                                    <Card.Title className={styles.cardtitle}>Card Title</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className={styles.card}>
                                    <Card.Img variant="top" src={example} className={styles.cardim} />
                                    <Card.Body className={styles.cardbod}>
                                    <Card.Title className={styles.cardtitle}>Card Title</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className={styles.card}>
                                    <Card.Img variant="top" src={example} className={styles.cardim} />
                                    <Card.Body className={styles.cardbod}>
                                    <Card.Title className={styles.cardtitle}>Card Title</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className={styles.card}>
                                    <Card.Img variant="top" src={example} className={styles.cardim} />
                                    <Card.Body className={styles.cardbod}>
                                    <Card.Title className={styles.cardtitle}>Card Title</Card.Title>
                                    </Card.Body>
                                </Card> 
                        </CardDeck> 
    Carousel className={styles.carousel}>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={example}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=Second slide&bg=282c34"
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=Third slide&bg=20232a"
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
    
    
    <div className={styles.wrap}>
      <div className={styles.left}>
        <h1>Parth Shah</h1>
        <div>
            <Image src={example} roundedCircle alt="profile" width="200px" height="200px"/>
        </div>
        <div><Button variant="primary">Contact Seller</Button>{' '}</div>
        <div><Button variant="secondary">Report Seller</Button>{' '}</div>
      </div>
      <div className={styles.right}>
        <Container>
            <Row>

            </Row>
        </Container>    
      </div>
    </div> */
};

export default connect(mapStateToProps)(Profile);
