import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projectsErp')) || [];
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProjects(storedProjects);
        setProducts(storedProducts);
    }, []);

    const completedProjects = projects.filter(project => project.completed).length;

    return (
        <div className='container-components dashboard'>
            <header className='header-components'>
                <h1>Dashboard</h1>
            </header>

            {/* Renderização dinâmica das caixas de projetos */}
            <section className='dashboard-boxes'>
                <div className={`boxes green`}>
                    <h2 className='boxes_title'>Projetos concluídos</h2>
                    <span>
                        <span className='boxes_subtitle'>{completedProjects} concluídos / </span>
                        <span className='boxes_subtitle'>{projects.length} projetos no total</span>
                    </span>
                    <button className='boxes-btn'>Ver Projetos</button>
                </div>

                <div className={`boxes yellow`}>
                    <h2 className='boxes_title'>Projetos em andamento</h2>
                    <span>
                        <span className='boxes_subtitle'>{projects.length - completedProjects} em andamento / </span>
                        <span className='boxes_subtitle'>{projects.length} projetos no total</span>
                    </span>
                    <button className='boxes-btn'>Ver Projetos</button>
                </div>

                <div className={`boxes blue`}>
                    <h2 className='boxes_title'>Produtos no estoque</h2>
                    <span>
                        <span className='boxes_subtitle'>{products.length} ativos / </span>
                        <span className='boxes_subtitle'>{products.length} produtos no total</span>
                    </span>
                    <button className='boxes-btn'>Adicionar</button>
                </div>
            </section>

            {/* Renderização dinâmica da tabela de produtos */}
            <section className='dashboard-principal'>
                <div className="all-product-container">
                    <div className="product-title-search">
                        <h2>PRODUTOS RECENTES</h2>
                        <button id='view-all'>Ver todos</button>
                    </div>

                    <table className='table-products'>
                        <thead>
                            <tr className='table-cabecalho'>
                                <th className='cabecalho-titles'>Nome</th>
                                <th className='cabecalho-titles'>Código</th>
                                <th className='cabecalho-titles'>Preço</th>
                                <th className='cabecalho-titles'>Quantidade</th>
                                <th className='cabecalho-titles'>Detalhes</th>
                                <th className='cabecalho-titles'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.cod}</td>
                                    <td>{product.price}</td>
                                    <td>{product.units}</td>
                                    <td><button id='btn-detail'>Detalhes</button></td>
                                    <td><button id='btn-remove'>Remover</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;

