// src/components/ProfileModal/ProfileModal.jsx
import React from 'react';
import styles from './ProfileModal.module.css';

const ProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times; {/* Símbolo de fechar */}
        </button>
        <div className={styles.avatar}>
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
            alt="Avatar"
          />
        </div>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.role}>{user.role}</p>
        <p className={styles.joined}>Data de Adesão: {user.joined}</p>
      </div>
    </div>
  );
};

export default ProfileModal;

