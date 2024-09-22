import {React,useContext} from 'react'

import noteContext from '../context/notes/noteContext';
const Noteitems = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context
  const {note,updateNote} = props;

  return (
    <div className="col-md-4 my-3">
      <div className="card text-center " style={{width :"18rem",margin:"auto"}}>
        <div className="card-body">
          <div className='d-flex'>

          <h5 className="card-title" style={{margin:"auto"}}>{note.title}</h5 >
          <div className='d-flex align-items-end flex-column '>
          <i className="fa-solid fa-pen-to-square my-2" style={{cursor:"pointer"}} onClick={()=>{updateNote(note)}}></i>
          <i className="fa-solid fa-trash-can my-2" style={{cursor:"pointer"}} onClick={()=>{deleteNote(note._id)
            props.showAlert("Successfully Note is deleted!","success");}} ></i>
          </div>
          </div>
          <p className="card-text">{note.description}</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
  )
}

export default Noteitems