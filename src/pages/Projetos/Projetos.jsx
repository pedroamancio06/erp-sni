// src/pages/Projetos/Projetos.jsx

import React, { useState, useEffect } from 'react';
import styles from './Projetos.module.css';
import FormProjetos from '../../components/FormProjetos/FormProjetos';
import TabelaForm from '../../components/TabelaForm/TabelaForm';
import Notification from '../../components/Notification/Notification'; // Importe o componente Notification

const Projetos = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [notification, setNotification] = useState(''); // Estado para gerenciar a notificação

  const saveProjects = (updatedProjects) => {
    localStorage.setItem('projectsErp', JSON.stringify(updatedProjects));
    setProjects(updatedProjects); // Atualiza o estado local
    setFilteredProjects(updatedProjects); // Atualiza os projetos filtrados
  };

  const addProject = (newProject) => {
    const updatedProjects = editingProject !== null 
      ? projects.map((p) => (p.id === editingProject.id ? newProject : p))
      : [{ ...newProject, id: Date.now() }, ...projects];
  
    saveProjects(updatedProjects);
    setEditingProject(null);
    
    // Exibir notificação
    setNotification(editingProject ? 'Projeto atualizado com sucesso!' : 'Projeto adicionado com sucesso!');
  };

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projectsErp')) || [];
    setProjects(storedProjects);
    setFilteredProjects(storedProjects); // Inicializa a lista filtrada
  }, []);

  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    saveProjects(updatedProjects);
    setNotification('Projeto excluído com sucesso!'); // Exibir notificação
  };

  const editProject = (project) => {
    setEditingProject(project);
  };

  return (
    <div className={styles.container}>
      <FormProjetos 
        addProject={addProject}
        editingProject={editingProject}
      />
      
      <TabelaForm 
        projects={filteredProjects}
        onEdit={editProject}
        onDelete={deleteProject}
      />
      
      {/* Adicione o componente Notification */}
      {notification && (
        <Notification 
          message={notification}
          onClose={() => setNotification('')} // Limpa a notificação após a animação
        />
      )}
    </div>
  );
}

export default Projetos;


