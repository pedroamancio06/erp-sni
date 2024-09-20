import { React, useState } from 'react';
import styles from './TabelaForm.module.css';
import Modal from '../Modal/Modal';

const TabelaForm = ({ projects, onEdit, onDelete }) => {

    const [selectedProject, setSelectedProject] = useState(null);

    const handleViewDetails = (project) => {
        setSelectedProject(project); // Abrir modal com projeto selecionado
    };

    const closeModal = () => {
        setSelectedProject(null); // Fechar modal
    };

  return (
    <div className={styles.container}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Projeto</th> 
                    <th>Cliente</th>
                    <th>Data</th>
                    <th>Ações</th> 
                </tr>
            </thead>
            <tbody >
                {projects.length  > 0 ? (
                    projects.map((project) => (
                        <tr className={styles.tableLine} key={project.id} >
                            <td onClick={() => handleViewDetails(project)}>{project.nameProject}</td>
                            <td onClick={() => handleViewDetails(project)}>{project.client}</td>
                            <td onClick={() => handleViewDetails(project)}>{project.date}</td>
                            <td>
                                <button className={styles.btnTable} onClick={() => onEdit(project)}>Editar</button>
                                <button className={styles.btnTable} onClick={() => onDelete(project.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr className={styles.containerNull}>
                        <td colSpan="4">Nenhum projeto adicionado</td>
                    </tr>
                )}
            </tbody>
        </table>

        {selectedProject && (
            <Modal onClose={closeModal}>
                <h2>{selectedProject.nameProject}</h2>
                <p><strong>Cliente:</strong> {selectedProject.client}</p>
                <p><strong>Data:</strong> {selectedProject.date}</p>
                <p><strong>Descrição:</strong> {selectedProject.description}</p>
            </Modal>
        )}
    </div>
  )
}

export default TabelaForm
