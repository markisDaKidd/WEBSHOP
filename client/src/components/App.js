import React, { createContext,useRef, useState } from 'react';
import '../app.css'
import Nav from './Nav';
import Cart from './Cart';
import Create from './Create';
import Login from './Login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Main from './Main'
import Cookies from 'js-cookie';


export let Context = createContext()
export default function App(){
    let verify = Cookies.get('user')?true:false;
    let [isLoggedIn,setIsLoggedIn]=useState(verify)
    return(

        <Context.Provider value ={{user:isLoggedIn,setIsLoggedIn}}>
            <Router>

                <Nav/>

                <Routes>
                    <Route path='/' element={<Main/>} />
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/create' element={<Create/>}/>
                </Routes>

            </Router>   
        </Context.Provider>
        
    )
}