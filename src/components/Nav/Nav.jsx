// src/components/Nav/Nav.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaWallet } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { IoPersonSharp } from 'react-icons/io5';
import styles from './Nav.module.css';
import ProfileModal from '../ProfileModal/ProfileModal';
import { MdManageSearch } from "react-icons/md";

const Nav = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const user = {
    name: 'Pedro Amancio',
    email: 'pedro@example.com',
    role: 'Desenvolvedor Júnior',
    joined: '01 de Janeiro de 2023',
  };

  return (
    <div className={styles.container}>
      <h1>SNI Service</h1>

      <ul className={styles.list}>
        <li>
          <Link to="dashboard">
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="estoque">
            <FaCartShopping /> Estoque
          </Link>
        </li>
        <li>
          <Link to="projetos">
            <FaProjectDiagram /> Projetos
          </Link>
        </li>
      </ul>

      <ul className={styles.manage}>
        <li>
          <Link to="controle">
            <MdManageSearch />Controle
          </Link>
        </li>
        <li
          className={styles.profileLink}
          onClick={() => setShowProfileModal(true)} // Abre o modal ao clicar
        >
          <IoPersonSharp /> Perfil
        </li>
      </ul>

      {showProfileModal && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfileModal(false)} // Fecha o modal ao clicar em "Fechar"
        />
      )}
    </div>
  );
};

export default Nav;
