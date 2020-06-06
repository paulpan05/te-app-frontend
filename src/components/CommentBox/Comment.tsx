import React, { useState, useEffect, useCallback } from 'react';
import styles from './index.module.scss';
import BlankProfile from '../../assets/img/blank-profile-picture.png';
import FlagImg from '../../assets/img/flag.png';
import { ReportComment } from '../ReportModals';
import { getUserProfile } from '../../api';

interface CommentProps {
  currentUser: firebase.User | null | undefined;
  commentId: string;
  userId: string;
  content: string;
  listingId: string;
}

const Comment: React.FC<CommentProps> = ({
  currentUser,
  commentId,
  userId,
  content,
  listingId,
}) => {
  const [showReportButton, setShowReportButton] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(BlankProfile);
  const [reportedUserName, setReportedUserName] = useState('');

  const getProfilePicture = useCallback(async () => {
    const userProfile = await getUserProfile(currentUser, userId);
    if (!userProfile) {
      return;
    }
    setProfilePicture(userProfile.picture);
    setReportedUserName(userProfile.name);
  }, [currentUser, userId]);

  useEffect(() => {
    getProfilePicture();
  }, [getProfilePicture]);

  return (
    <>
      <ReportComment
        show={showReportModal}
        setShow={setShowReportModal}
        listingId={listingId}
        commentId={commentId}
        reportedUserName={reportedUserName}
        reportedProfilePicture={profilePicture}
      />
      <div className={styles.comment}>
        <img src={profilePicture} className={styles.authorPicture} alt="author" />
        <div
          className={styles.commentText}
          onMouseEnter={() => {
            setShowReportButton(true);
          }}
          onMouseLeave={() => setShowReportButton(false)}
        >
          {content}
          {showReportButton && (
            <button
              type="submit"
              className={styles.reportComment}
              onClick={() => setShowReportModal(true)}
            >
              <img src={FlagImg} alt="report flag" className={styles.reportCommentImg} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
