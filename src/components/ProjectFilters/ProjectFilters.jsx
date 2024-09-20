// src/components/ProjectFilters/ProjectFilters.jsx

import React from 'react';
import styles from './ProjectFilters.module.css';

const ProjectFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <div className={styles.filters}>
      <input 
        type="text" 
        placeholder="Buscar projeto por nome ou cliente" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <select 
        value={statusFilter} 
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">Todos os Status</option>
        <option value="em andamento">Em andamento</option>
        <option value="concluído">Concluído</option>
      </select>
    </div>
  );
};

export default ProjectFilters;
