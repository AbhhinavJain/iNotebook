// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from './component/Navbar';
import { Home } from './component/Home';
import { About } from './component/About';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
function App() {
  const [alert, setAlert] = useState(null);
    const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 2000);
  }
  return (
    <>
      <NoteState>

      <BrowserRouter>
      <Navbar showAlert={showAlert} />
      <Alert alert={alert}/>
      <div className='container my-3'>

      <Routes>
        <Route exact path='/' element = {<Home showAlert={showAlert}></Home>}>  </Route>
        <Route exact path='/about' element={<About></About>}>   </Route>
        <Route exact path='/login' element={<Login showAlert={showAlert}></Login>}>   </Route>
        <Route exact path='/signup' element={<Signup showAlert={showAlert}></Signup>}>   </Route>
      </Routes>
      </div>
    </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
