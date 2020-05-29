import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import ProfileImg from '../../assets/img/sarah.png';
import FlagImg from '../../assets/img/flag.png';
import { ReportComment } from '../ReportModals';
import { getUserProfile } from '../../api';

interface CommentProps {
  currentUser: firebase.User | null | undefined;
  commentId: string;
  userId: string;
  content: string;
}

const Comment: React.FC<CommentProps> = ({ currentUser, commentId, userId, content }) => {
  const [showReportButton, setShowReportButton] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(ProfileImg);

  const getProfilePicture = async () => {
    const userProfile = await getUserProfile(currentUser);
    if(!userProfile)
      return
    console.log(JSON.stringify(userProfile));
    setProfilePicture(userProfile.picture);
  };

  useEffect(() => {getProfilePicture()}, [currentUser]);

  return (
    <>
      <ReportComment show={showReportModal} setShow={setShowReportModal} />
      <div className={styles.comment}>
        <img src={profilePicture} className={styles.authorPicture} alt="author" />
        <div
          className={styles.commentText}
          onMouseEnter={() => {
            setShowReportButton(true);
            console.log(currentUser?.photoURL);
          }}
          onMouseLeave={() => setShowReportButton(false)}
        >
          {content}
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

export default Comment;
