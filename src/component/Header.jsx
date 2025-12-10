import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    
    <div >
        <header className='bg-primary p-2 ps-3 md-0 d-flex align-items-center'>
        <span className="app-icon">📦</span>
        <h1 className='text-white w-50'>  Store Management App</h1>
    
<div className="dark-toggle-container ms-auto me-3">
  <input
    type="checkbox"
    id="darkToggle"
    onChange={(e) => {
      if (e.target.checked) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    }}
  />
  <label htmlFor="darkToggle" className="toggle-label"></label>


        <div className=' text-end'>
            
            <Link className="btn btn-light  me-3 mt-2 ml-0" to="/add" >Add Product</Link>
            <Link className="btn btn-light me-3 mt-2" to="/view">View Product</Link>
            <Link className="btn btn-light me-3 mt-2 ml-0" to="/dashboard">Dashboard</Link>
            
        </div>
        </div>
        </header>
    </div>

  )
}

export default Header