import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
            {children}
            <button className={styles.closeButton} onClick={onClose}>
                Fechar
            </button>
        </div>
    </div>
  )
}

export default Modal
