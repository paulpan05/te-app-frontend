import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './index.module.scss';
import ProfileImg from '../../assets/img/sarah.png';
import FlagImg from '../../assets/img/flag.png';
import { ReportComment } from '../ReportModals';

interface CommentProps {
  dispatch?: Dispatch<any>;
  text: string;
}

const Comment: React.FC<CommentProps> = ({ dispatch, text }) => {
  const [showReportButton, setShowReportButton] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <>
      <ReportComment show={showReportModal} setShow={setShowReportModal}></ReportComment>
      <div className={styles.comment}>
        <img src={ProfileImg} className={styles.authorPicture} alt="author" />
        <div
          className={styles.commentText}
          onMouseEnter={() => setShowReportButton(true)}
          onMouseLeave={() => setShowReportButton(false)}
        >
          {text}
          {showReportButton && (
            <button className={styles.reportComment} onClick={() => setShowReportModal(true)}>
              <img src={FlagImg} alt="report flag" className={styles.reportCommentImg} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default connect()(Comment);
