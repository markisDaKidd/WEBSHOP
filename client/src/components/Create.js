
import React,{useEffect,useState} from 'react';
import cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';


export default function Create(){
    let initialState={username:'',password:'',email:''}
    let navigate = useNavigate()
    let [formState, setState]=useState(initialState)
    let [send,setSend]=useState(false)
    let handlesubmit=(e)=>{
        e.preventDefault()
        setSend(true)
        
    }
    let handleChange=(e)=>{
        
        console.log(formState);
        setState({...formState,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        if (send===true) {
            let response
            fetch('http://localhost:3000/create',{headers: { 'Accept': 'application/json','Content-Type': 'application/json'},method:'POST',body:JSON.stringify(formState)}).then(res=>res.json()).then(res=>{
                if (res.answer==='ok') {
                    navigate('/')
                }
            console.log(res)})
            
            setSend(false)
        }
    },[send])
    return(
        <div className ='wrapper-account'>
              <div className='login-container'>

                    <form onSubmit={handlesubmit} id='login-form' method="post" action ='localhost:5000/create-account'>
                        <label htmlFor= 'username'>username</label>
                        <input onChange={handleChange} value ={formState.username} required type="text" id='username'name ='username'/>
                        <label htmlFor= 'pass'>password</label>
                        <input onChange={handleChange} value ={formState.password} required type="password"id='password' name='password' />
                        <label htmlFor= 'email'>email</label>
                        <input onChange={handleChange} value ={formState.email} required type="email" id='email'name='email'/>
                        <input type="submit" value='submit' />

                    </form>
                </div>

        </div>
      
    )
   
}