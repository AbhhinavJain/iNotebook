import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [data, setData] = useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // const url = "http://localhost:5000/api/auth/login";
        try {
            
            const response = await fetch("http://localhost:5000/api/auth/login",{
                method :'POST',
                headers :{
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({email:data.email,password:data.password})
            });
            const json = await response.json();
            if(json.success){
                // save the token
                localStorage.setItem('token',json.authToken)
                navigate('/');
                props.showAlert("Welcome to iNotebook!","success");
            }
            else{
                // alert("Not match email and password")
                props.showAlert("Invalid email and Password!","danger");
            }
            console.log(json);
        } catch (error) {
            props.showAlert("Server Error! ","danger");
        }
    }
    const onChange =(e)=>{
        setData({...data,[e.target.name]:e.target.value});  
      }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email"  className="form-control" name='email' value={data.email} onChange={onChange} id="email" aria-describedby="email" placeholder="Enter email" />
                        <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"className="form-control" name='password' value={data.password}  onChange={onChange}  id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-3" >Submit</button>
            </form>
        </div>
    )
}

export default Login
