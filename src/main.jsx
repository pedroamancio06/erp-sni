import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Estoque from './pages/Estoque/Estoque.jsx';
import Projetos from './pages/Projetos/Projetos.jsx';
import Controle from './pages/Controle/Controle.jsx';
import Login from './pages/Login/Login.jsx';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute.jsx'; // Componente de proteção de rotas

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Tela de login como rota inicial
  },
  {
    path: "/login",
    element: <Login />, // Tela de login
  },
  {
    path: "/app",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ), // Rotas protegidas dentro do App
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "estoque", element: <Estoque /> },
      { path: "projetos", element: <Projetos /> },
      { path: "controle", element: <Controle /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
