import React, { useContext, useEffect, useRef ,useState} from 'react'
import { useNavigate } from 'react-router-dom';

import noteContext from '../context/notes/noteContext';
import { AddNote } from './AddNote';
import Noteitems from './Noteitems';
export default function Notes(props) {

  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
        getNotes();
    }
    else{
      navigate('/login');
    }
  },[])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
  const updateNote = (currentnote) => {
    ref.current.click();
    setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  }
  const handleClick =(e)=>{
    // console.log(note.id)
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Successfully Edit! ","success");
  }
  const onChange =(e)=>{
    setnote({...note,[e.target.name]:e.target.value});  
  }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleMo
dalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" name='etitle' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">description</label>
                  <input type="text" className="form-control" value={note.edescription} id="edescription" name='edescription' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">tag</label>
                  <input type="text" className="form-control" value={note.etag} id="etag" name='etag' onChange={onChange} />
                </div>
                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2 className='text-center'>Your Notes</h2>
        {notes.map((notes) => {
          return <Noteitems showAlert={props.showAlert} note={notes} updateNote={updateNote} key={notes._id} />
        })}
      </div>
    </>
  )
}
