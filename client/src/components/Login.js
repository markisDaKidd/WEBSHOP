import React, { useContext, useEffect,useState } from 'react';
import cookies from'js-cookie'
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from './App';



export default function Login(){
    let dispatch=useDispatch()
    let state_items=useSelector(state=>(state.Items))

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

    let {setIsLoggedIn} = useContext(Context)

    useEffect(()=>{
        if (send===true) {
            let response

            fetch('http://localhost:3000/login',{headers: { 'Accept': 'application/json','Content-Type': 'application/json'},
            method:'POST',credentials:'include',body:JSON.stringify(formState)}).then(res=>res.json()).then(res=>{
                console.log(res)
                if (res.answer==='ok') {
        
                    dispatch(LOGIN(state_items))
                    setIsLoggedIn(true)
                    navigate('/')
                    
                   
                    
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