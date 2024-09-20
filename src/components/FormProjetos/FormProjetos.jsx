import { React, useState, useEffect } from 'react';
import styles from './FormProjetos.module.css';


const FormProjetos = ({ addProject, editingProject }) => {

    const [nameProject, setNameProject] = useState('');
    const [client, setClient] = useState();
    const [date, setDate] = useState();
    const [description, setDescription] = useState('');

    useEffect(() => {
      if (editingProject) {
        setNameProject(editingProject.nameProject);
        setClient(editingProject.client);
        setDate(editingProject.date);
        setDescription(editingProject.description || '');
      } else {
        setNameProject('');
        setClient('');
        setDate('');
        setDescription('');
      }
    }, [editingProject]);

    const handleAddProject = (e) => {
        e.preventDefault();
        
        const newProject = {
          id: editingProject ? editingProject.id : Date.now(),
          nameProject,
          client,
          date,
          description
        };

        addProject(newProject);
        setNameProject('');
        setClient('');
        setDate('');
        setDescription(editingProject.description || '');
    }

  return (
    <form className={styles.form} onSubmit={handleAddProject}>
      <div>
        <span className={styles.formItem}>
            <label htmlFor="name">Projeto</label>
            <input 
                type="text" 
                className={styles.input}
                onChange={(e) => setNameProject(e.target.value)}
                value={nameProject}
                required
            />
        </span>
        <span className={styles.formItem}>
            <label htmlFor="name">Cliente</label>
            <input 
                type="text" 
                className={styles.input}
                onChange={(e) => setClient(e.target.value)}
                value={client}
                required
            />
        </span>
        <span className={styles.formItem}>
            <label htmlFor="name">Data</label>
            <input 
                type="date" 
                className={styles.input}
                onChange={(e) => setDate(e.target.value)}
                value={date}
                required
            />
        </span>
      </div>
      <span className={styles.formItem} id={styles.description}>
            <label htmlFor="description">Descrição</label>
            <textarea
                className={styles.input}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
        </span>
      <button type='submit' className={styles.btnAdd}>
        {editingProject ? 'Salvar Edição' : 'Adicionar'}
      </button> 
    </form>
  )
}

export default FormProjetos
