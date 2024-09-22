import React,{useEffect} from 'react'
import {
    Link, useLocation
  } from "react-router-dom";

export const Navbar = (props) => {
  let location = useLocation();
  useEffect(() => {
  }, [location])
  const Logout = ()=>{
    localStorage.removeItem('token');
    props.showAlert("Have a nice day!","success");
  }
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/" ?"active":""}`} aria-current="page" to="/"><i className="fa-solid fa-house"></i></Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about" ?"active":""}`} to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link disabled" to='/'>Disabled</Link>
        </li>
      </ul>
      { 
        !localStorage.getItem('token') ?
        <form className="d-flex">
        <Link className="btn btn-primary " to={"/login"} role="button">Login</Link>
        <Link className="btn btn-primary mx-2" to={"/signup"} role="button">SignUp</Link>
        </form> 
        : <Link className="btn btn-primary " to={"/login"} onClick={Logout} role="button">Logout</Link>
      }
    </div>
  </div>
</nav>
  )
}
