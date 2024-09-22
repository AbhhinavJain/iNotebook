import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [data, setdata] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(data.password!==data.cpassword){
            alert("password is not match")
        }
        else{

            try {
                
                const response = await fetch("http://localhost:5000/api/auth/createuser",{
                method :'POST',
                headers :{
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({name:data.name,email:data.email,password:data.password})
            });
            const json = await response.json();
            if(json.success){
                localStorage.setItem('token',json.authtoken)
                navigate('/');
            }
            else{
                console.log("worng")
            }
            console.log(json);
        } catch (error) {
            console.log("error")
        }
    }
    }
    const onChange = (e)=>{
        setdata({...data,[e.target.name]:e.target.value});  
    }
  return (
    <div className='container'>
    <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input type="text"  className="form-control" name='name' value={data.name} onChange={onChange} id="name" aria-describedby="name" placeholder="Enter Name" />
                {/* <small id="name" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>
        <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input type="email"  className="form-control" name='email' value={data.email} onChange={onChange} id="email" aria-describedby="email" placeholder="Enter email" />
                <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input type="password"className="form-control" name='password' value={data.password}  onChange={onChange}  id="password" placeholder="Password" minLength={5} required />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password"className="form-control" name='cpassword' value={data.cpassword}  onChange={onChange}  id="cpassword" placeholder="Confirm Password" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary my-3" >Submit</button>
    </form>
</div>
  )
}

export default Signup
