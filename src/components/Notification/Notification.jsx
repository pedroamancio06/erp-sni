import React from 'react';
import styles from './Notification.module.css';

const Notification = ({ message, onClose }) => {
  return (
    <div className={styles.notification} onAnimationEnd={onClose}>
      {message}
    </div>
  );
};

export default Notification;
