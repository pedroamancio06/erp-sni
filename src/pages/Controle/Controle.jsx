import React, { useState, useEffect } from 'react';
import styles from './Controle.module.css';
import TabelaForm from '../../components/TabelaForm/TabelaForm';
import Notification from '../../components/Notification/Notification'; // Importe o componente de notificação

const Controle = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', phone: '' });
  const [editEmployeeIndex, setEditEmployeeIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false); // Estado para controlar a notificação

  // Carrega os projetos e funcionários salvos no localStorage
  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projectsErp')) || [];
    setProjects(storedProjects);
    
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  // Filtra os projetos com base no termo de busca e filtro de status
  const filteredProjects = projects.filter((project) => {
    return (
      (project.nameProject.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter ? project.status === statusFilter : true)
    );
  });

  const handleAddOrEditEmployee = () => {
    let updatedEmployees;

    if (editEmployeeIndex !== null) {
      updatedEmployees = employees.map((emp, index) => 
        index === editEmployeeIndex ? newEmployee : emp
      );
      setMessage('Cliente Editado!');
    } else {
      updatedEmployees = [...employees, newEmployee];
      setMessage('Cliente Adicionado!');
    }

    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    resetForm();
    showNotificationMessage(); // Chama a função para mostrar a notificação
  };

  const handleEditEmployee = (index) => {
    setNewEmployee(employees[index]);
    setEditEmployeeIndex(index);
    setShowModal(true);
  };

  const handleDeleteEmployee = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setMessage('Cliente Excluído!');
    showNotificationMessage(); // Chama a função para mostrar a notificação
  };

  const resetForm = () => {
    setNewEmployee({ name: '', position: '', phone: '' });
    setEditEmployeeIndex(null);
    setShowModal(false);
  };

  const showNotificationMessage = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Duração da notificação
  };

  return (
    <div className={styles.container}>
      <h1>Controle</h1>
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
      <TabelaForm projects={filteredProjects} />

      <div className={styles.employeeTable}>
        <span className={styles.employeeTop}>
          <h2>Clientes</h2>

          <button className={styles.addButton} onClick={() => setShowModal(true)}>
            Adicionar Cliente
          </button>
        </span>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ramo de Atuação</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                  <td>{emp.phone}</td>
                  <td>
                    <button className={styles.btnTable} onClick={() => handleEditEmployee(index)}>Editar</button>
                    <button className={styles.btnTable} onClick={() => handleDeleteEmployee(index)}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className={styles.containerNull}>
                <td colSpan="4">Nenhum cliente adicionado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{editEmployeeIndex !== null ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
            <input 
              type="text" 
              placeholder="Nome do Cliente" 
              value={newEmployee.name} 
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Ramo de atuação" 
              value={newEmployee.position} 
              onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Telefone do Cliente" 
              value={newEmployee.phone} 
              onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })} 
            />
            <button onClick={handleAddOrEditEmployee}>
              {editEmployeeIndex !== null ? 'Salvar' : 'Adicionar'}
            </button>
            <button onClick={resetForm}>Cancelar</button>
          </div>
        </div>
      )}

      {showNotification && (
        <Notification 
          message={message} 
          onClose={() => setShowNotification(false)} 
        />
      )}
    </div>
  );
};

export default Controle;



