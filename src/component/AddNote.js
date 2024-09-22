import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';
export const AddNote = (props) => {
    const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setnote] = useState({title:"",description:"",tag:""})
  const handleClick =(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setnote({title:"",description:"",tag:""})
    props.showAlert("Successfully Note is added!","success");
  }
  const onChange =(e)=>{
    setnote({...note,[e.target.name]:e.target.value});
  }
  return (
      <div className='container my-3'>
        <h2 className='text-center'>Add Notes</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} aria-describedby="title" minLength={3} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">description</label>
              <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} minLength={5}/>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">tag</label>
              <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
          </form>
      </div>
  )
}
