import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.scss';
import { reportUser } from '../../api';
import { rootState } from '../../redux/reducers';

interface ReportUserProps {
  user?: firebase.User | null | undefined;
  show: boolean;
  setShow: Function;
  reportedUserId: string;
  reportedUserName: string;
  reportedProfilePicture: string;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

const ReportUser: React.FC<ReportUserProps> = ({
  user,
  show,
  setShow,
  reportedUserId,
  reportedUserName,
  reportedProfilePicture,
}) => {
  const [reportReason, setReportReason] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReportReason(event.target.value);
  };

  const handleSubmit = async () => {
    const textVal = reportReason.trim();
    if (!textVal) {
      toast('Make sure to submit a reason for your report.');
      return;
    }
    const type = 'User Report';
    const reportId = uuidv4();
    const description = textVal;
    const success = await reportUser(user, type, reportId, description, reportedUserId);
    if (success) {
      setShow(false);
      setReportReason('');
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
              <div className={styles.reportTitle}>Report User</div>
            </Row>
            <Row className={styles.pad2}>
              <img src={reportedProfilePicture} className={styles.sellerPicture} alt="seller" />
              <div className={styles.reportTitle} style={{ paddingLeft: '1rem' }}>
                {reportedUserName}
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

export default connect(mapStateToProps)(ReportUser);
