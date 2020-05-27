import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import styles from './index.module.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileImg from '../../assets/img/sarah.png';

interface ReportCommentProps {
  dispatch?: Dispatch<any>;
  show: boolean;
  setShow: Function;
}

const ReportComment: React.FC<ReportCommentProps> = ({ dispatch, show, setShow }) => {
  const [reportReason, setReportReason] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReportReason(event.target.value);
  };

  const handleSubmit = () => {
    const textVal = reportReason.trim();
    if (!textVal) {
      return;
    }
    console.log(textVal);
    setShow(false);
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
              <div className={styles.reportTitle}>Report Comment</div>
            </Row>
            <Row className={styles.pad2}>
              <img src={ProfileImg} className={styles.sellerPicture} alt="seller" />
              <div className={styles.reportTitle} style={{ paddingLeft: '1rem' }}>
                Sarah A.
              </div>
            </Row>
            <Row className={styles.pad2}>
              <div className={styles.reportReason}>Reason for Reporting?</div>
              <textarea
                className={styles.reportTextArea}
                onChange={handleTextChange}
              ></textarea>
            </Row>
            <Row className={styles.pad2}>
              <button
                type="submit"
                className={styles.submitButton}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </Row>
          </Card>
        </Row>
      </Modal>
    </div>
  );
};

export default ReportComment;