import React, { useEffect, useState,useLayoutEffect, useContext } from 'react';
import cart from'../images/cart.svg'
import cookies from 'js-cookie'
import { Link } from 'react-router-dom';
import {LOGOUT} from '../Redux/actions'
import {useDispatch} from 'react-redux'
import { Context } from './App';



export default function Nav(){

    // let user = JSON.stringify(cookies.get('user')) || null

    // let [logout,handleLog]= useState(false)

    // let handleLogout=()=>{
    //     handleLog(true)
    // }

    let dispatch = useDispatch()
    let {user, setIsLoggedIn}= useContext(Context)

    let LOGOUTDiv= <div style={{display:'flex',justifyContent:'center'}}><h1 style={{cursor:'pointer'}} onClick={()=>setIsLoggedIn(false)}>LOGOUT</h1></div>
    let NORMALDiv = <div style={{display:'flex',justifyContent:'center'}}>
    <h1>
        <Link className='route-link' to='/login'>Login |</Link>        
    </h1>

    <h1>
        <Link className='route-link' to='/create' >| Create</Link> 
    </h1>
</div>

    useEffect(()=>{
        if (user===false) {
            cookies.remove('user')
            dispatch(LOGOUT())
            return

        }
        setIsLoggedIn(true)
        
    
    },[user])

    
    
    return(
        <nav>
            <div>
                <h1>
                MetaShop
                </h1>
            </div>


            {user?LOGOUTDiv:NORMALDiv}
           

            <div>
                <Link className='route-link' to='/cart'><img style={{width:'1.5vw'}}src={cart} alt="bag" /></Link>
               
            </div>

        </nav>
    )
}