import './App.css';

import { Outlet } from 'react-router-dom';

import Nav from './components/Nav/Nav.JSX';

function App() {

  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}


export default App
