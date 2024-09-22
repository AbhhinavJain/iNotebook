import React,{useState} from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
    const notesIntial = []
      const [notes, setNotes] = useState(notesIntial)

      // Get all Note
      const getNotes = async () =>{
           //Api Call
           try {
              const response = await fetch(`${host}/api/notes/fetchallnotes`,{
                method: 'GET',
                headers : {
                  'Content-Type': 'application/json',
                  'auth-token' :localStorage.getItem('token')
                  }
                });
                const json = await response.json();
                setNotes(json);
                console.log(json);
            } catch (error) {
              console.log("server is not working")
            }
      }
      // Add Note
      const addNote = async (title,description,tag) =>{
           //Api Call
           const response = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers : {
              'Content-Type': 'application/json',
              'auth-token' :localStorage.getItem('token')
            },
            body : JSON.stringify({title,description,tag})
          });
          const json = await response.json();
          // props.showAlert("Successfully Note is added!","success");

        console.log("new note add."+json)
        const note = {
          "_id": "62d677b5eddeb368d0472f61",
          "user": "62d52d0672f1e1f95bef4a30",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-07-19T09:21:57.268Z",
          "__v": 0
        };
        setNotes(notes.concat(note));
      }

      // Delete Note
      const deleteNote = async (id)=>{
        //Api Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method: 'DELETE',
          headers : {
            'Content-Type': 'application/json',
            'auth-token' :localStorage.getItem('token')
          }
        });
        const json = await- response.json();
        console.log(json)
        console.log("delete Note of id" + id);
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)
        // props.showAlert("Successfully Note is deleted!","success");
      }

      // Edit Note
      const editNote = async (id,title,description,tag) =>{

        //Api Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method: 'PUT',
          headers : {
            'Content-Type': 'application/json',
            'auth-token' :localStorage.getItem('token')
          },
          body : JSON.stringify({title,description,tag})
        });
        const json = response.json();
        console.log(json)
        let newNote = JSON.parse(JSON.stringify(notes))
        // logic to edit in client
        for (let index = 0; index < newNote.length; index++) {

          const element = newNote[index];
          if(element._id===id){
            newNote[index].title = title;
            newNote[index].description = description;
            newNote[index].tag = tag;
            break;
          }
        }
        setNotes(newNote);
      }
    return(
        <noteContext.Provider value = {{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;