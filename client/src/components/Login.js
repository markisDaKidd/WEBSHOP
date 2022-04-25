import React, { useEffect,useState } from 'react';
import cookies from'js-cookie'
import { useNavigate } from 'react-router-dom';



export default function Login(){
    let navigate = useNavigate()
    let initialState={username:'',password:''}
    let [send,setSend]=useState(false)
    let [formState, setState]=useState(initialState)

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

            fetch('http://localhost:5000/login',{headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
            method:'POST',credentials:'include',body:JSON.stringify(formState)}).then(res=>res.json()).then(res=>{
                console.log(res)
                if (res.answer==='ok') {
                    let user = JSON.parse(cookies.get('user'))
                    console.log(user.username);
                    setTimeout(()=>{
                        navigate('/')
                    },1000)
                    
                }
            })

            setSend(false)
        }
    },[send])
    return(
        <div className ='wrapper-account'>
              <div className='login-container'>

                    <form onSubmit={handlesubmit} id='login-form' method="POST">
                        <label htmlFor= 'username'>username</label>
                        <input onChange={handleChange} value ={formState.username} required type="text" id='username'name ='username'/>
                        <label htmlFor= 'pass'>password</label>
                        <input onChange={handleChange} value ={formState.password} required type="password"id='password' name='password' />
                        <input type="submit" value ='submit' />

                    </form>
                </div>

        </div>
      
    )
   
}