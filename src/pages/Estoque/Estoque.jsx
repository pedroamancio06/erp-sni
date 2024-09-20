import React, { useState, useEffect } from 'react';
import './Estoque.css';
import { MdOutlineAddCircle } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { BiDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Notification from '../../components/Notification/Notification'; // Importe o componente de notificação

const Estoque = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    cod: '',
    price: '',
    units: '',
    details: ''
  });
  const [notification, setNotification] = useState(null);

  // Recuperar os produtos do localStorage ao carregar o componente
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Função para atualizar o localStorage
  const updateLocalStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  };

  // Atualiza o localStorage sempre que os produtos mudarem
  useEffect(() => {
    updateLocalStorage(products);
  }, [products]);

  const handleRemove = (cod) => {
    const updatedProducts = products.filter(product => product.cod !== cod);
    setProducts(updatedProducts);
    setNotification('Produto removido com sucesso!'); // Adiciona notificação
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([...products, { ...newProduct, cod: Math.floor(Math.random() * 1000), price: parseFloat(newProduct.price), units: parseInt(newProduct.units) }]);
    setNewProduct({
      name: '',
      cod: '',
      price: '',
      units: '',
      details: ''
    });
    setIsModalOpen(false);
    setNotification('Produto adicionado com sucesso!'); // Adiciona notificação
  };

  const linhas = (nome) => {
    const nomeUpperCase = nome ? nome.toUpperCase() : '';
    return products.map((product) => {
      if (product.name.toUpperCase().includes(nomeUpperCase) || nomeUpperCase === '') {
        return (
          <tr className='table-info' key={product.cod}>
            <td className='info-text'>{product.name}</td>
            <td className='info-text'>{product.cod}</td>
            <td className='info-text'>{product.price}</td>
            <td className='info-text'>{product.units}</td>
            <td className='info-text'><button id='btn-detail'><BiDetail /></button></td>
            <td className='info-text'>
              <button id='btn-remove' onClick={() => handleRemove(product.cod)}>
                <RiDeleteBin6Line />
              </button>
            </td>
          </tr>
        );
      }
      return null;
    });
  };

  return (
    <>
      <div className='container-components'>
        <header className='header-components'>
          <h1>Estoque</h1>
        </header>

        <section className="estoque-container">
          <button id="add-product" onClick={() => setIsModalOpen(true)}>
            <span><MdOutlineAddCircle /></span> ADD PRODUTO
          </button>

          <div className="all-product-container">
            <div className="product-title-search">
              <h2>PRODUTOS</h2>
              <span className="container-search">
                <p><IoIosSearch /></p>
                <input 
                  type="search" 
                  id="search-product" 
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </span>
            </div>

            <table className='table-products'>
              <thead>
                <tr className='table-cabecalho'>
                  <th className='cabecalho-titles'>Nome</th>
                  <th className='cabecalho-titles'>Código</th>
                  <th className='cabecalho-titles'>Preço</th>
                  <th className='cabecalho-titles'>Quantidade</th>
                  <th className='cabecalho-titles'>Pedir</th>
                  <th className='cabecalho-titles'>Ações</th>
                </tr>
              </thead>
              <tbody>
                {linhas(searchTerm)}
              </tbody>
            </table>
          </div>
        </section>

        {isModalOpen && (
          <div className="modal">
            <form className="modal-content" onSubmit={handleAddProduct}>
              <h2>Adicionar Produto</h2>
              <label>Nome:</label>
              <input 
                type="text" 
                name="name" 
                value={newProduct.name} 
                required
                onChange={handleInputChange}
              />
              <label>Preço:</label>
              <input 
                type="number" 
                name="price" 
                value={newProduct.price} 
                onChange={handleInputChange}
              />
              <label>Quantidade:</label>
              <input 
                type="number" 
                name="units" 
                value={newProduct.units} 
                onChange={handleInputChange}
              />
              <label>Detalhes:</label>
              <input 
                type="text" 
                name="details" 
                value={newProduct.details} 
                onChange={handleInputChange}
              />
              <button>Adicionar</button>
              <button type='button' onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </form>
          </div>
        )}

        {notification && (
          <Notification message={notification} onClose={() => setNotification(null)} />
        )}
      </div>
    </>
  );
}

export default Estoque;

