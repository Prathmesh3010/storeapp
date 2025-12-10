import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Delete.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './component/Header'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import AddProduct from './views/AddProduct'
import ViewProduct from './views/ViewProduct'
import { ToastContainer } from 'react-toastify';
import Dashboard from './views/Dashboard';
import 'react-toastify/dist/ReactToastify.css';


function App() {
 useEffect(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  const toggle = () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const btn = document.querySelector(".mode-toggle");
  btn?.addEventListener("click", toggle);

  return () => btn?.removeEventListener("click", toggle);
}, []);

  return (
    <>
      <div  className='App'>
          <BrowserRouter>
          <Header/>
           <ToastContainer position="top-right" autoClose={2500} />
          <Routes>
            <Route path='add' element={<AddProduct/>}/>
            <Route path='view' element={<ViewProduct/>}/>
            <Route path='edit/:id' element={<AddProduct/>}/>
            <Route path='dashboard' element={<Dashboard/>} />
          </Routes>
          </BrowserRouter>
      </div>
    </>
  )
}

export default App
