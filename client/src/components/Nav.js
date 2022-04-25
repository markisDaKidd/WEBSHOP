import React, { useEffect, useState,useLayoutEffect } from 'react';
import cart from'../images/cart.svg'
import cookies from 'js-cookie'
import { Link } from 'react-router-dom';


export default function Nav(){

    let [logout,handleLog]= useState(false)

    let handleLogout=()=>{
        handleLog(true)
    }

    useEffect(()=>{
        if (logout===true) {
            cookies.remove('user')
        }
        handleLog(state=>false)
    
    },[logout])

    let user = JSON.stringify(cookies.get('user'))
    
    return(
        <nav>
            <div>
                <h1>
                MetaShop
                </h1>
            </div>
            {user?<div style={{display:'flex',justifyContent:'center'}}><h1>{user.username}</h1> <h1 style={{cursor:'pointer'}} onClick={handleLogout}>LOGOUT</h1></div>:
                <div style={{display:'flex',justifyContent:'center'}}>
                    <h1>
                        <Link className='route-link' to='/login'>Login |</Link>        
                    </h1>

                    <h1>
                        <Link className='route-link' to='/create' >| Create</Link> 
                    </h1>
                </div>
                    }
           

            <div>
                <Link className='route-link' to='/cart'><img style={{width:'1.5vw'}}src={cart} alt="bag" /></Link>
               
            </div>

        </nav>
    )
}