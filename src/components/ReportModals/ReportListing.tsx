import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import ProfileImg from '../../assets/img/sarah.png';
import { rootState } from '../../redux/reducers';
import styles from './index.module.scss';
import { reportListing } from '../../api';
import { v4 as uuidv4 } from 'uuid';

interface ReportListingProps {
  dispatch?: Dispatch<any>;
  user: firebase.User | null | undefined;
  show: boolean;
  setShow: Function;
  listingId: string;
  reportedListingName: string
  reportedUserName: string;
  reportedProfilePicture: string;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const ReportListing: React.FC<ReportListingProps> = ({ dispatch, user, show, setShow, listingId, reportedListingName, reportedUserName, reportedProfilePicture }) => {
  const [reportReason, setReportReason] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReportReason(event.target.value);
  };

  const handleSubmit = async () => {
    const textVal = reportReason.trim();
    if (!textVal) {
      return;
    }
    setShow(false);
    const type = 'Listing Report';
    const reportId = uuidv4();
    const description = textVal;
    const success = await reportListing(user, type, reportId, description, listingId);
    if (success) {
      toast('Report submitted. Thank you for keeping Triton Exchange safe and secure!');
    } else {
      toast('Error submitting report. Please try again!');
    }
  };

  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)} size="lg" centered backdrop="static">
        <Row style={{ maxHeight: '100%', width: '100%' }} className="no-gutters">
          <Card className={styles.myCard}>
            <Row>
              <Col xs={11}>
                <></>
              </Col>
              <Col xs={1}>
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  onKeyDown={() => setShow(false)}
                  className={styles.exitButton}
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" className={styles.flag} />
                </button>
              </Col>
            </Row>
            <Row className={styles.pad1}>
              <div className={styles.reportTitle}>Report Listing</div>
            </Row>
            <Row className={styles.pad1}>
              <div className={styles.listingTitle}>{reportedListingName}</div>
            </Row>
            <Row className={styles.pad2}>
              <img src={reportedProfilePicture} className={styles.sellerPicture} alt="seller" />
              <div className={styles.reportTitle} style={{ paddingLeft: '1rem' }}>
                Seller: {reportedUserName}
              </div>
            </Row>
            <Row className={styles.pad2}>
              <div className={styles.reportReason}>Reason for Reporting?</div>
              <textarea className={styles.reportTextArea} onChange={handleTextChange} />
            </Row>
            <Row className={styles.pad2}>
              <button type="submit" className={styles.submitButton} onClick={handleSubmit}>
                Submit
              </button>
            </Row>
          </Card>
        </Row>
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps)(ReportListing);
