import React, { useState } from 'react';
import { Dispatch } from 'redux';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './index.module.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface ReportUserProps {
  dispatch?: Dispatch<any>;
  show: boolean;
  setShow: Function;
  onHide?: Function;
}

const ReportUser: React.FC<ReportUserProps> = ({ dispatch, show, setShow, onHide }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        
        dialogClassName={styles.modal}
        centered
      >
        <div className={styles.myModal}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="d-flex justify-content-center mb-2">
              Report User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Sarah A.</h4>
            <p className={styles.reportReason}>Reason for Reporting?</p>
            <textarea className={styles.reportTextArea}></textarea>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default ReportUser;
