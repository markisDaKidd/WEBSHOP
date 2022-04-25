import React from 'react';
import '../app.css'
import Nav from './Nav';
import Cart from './Cart';
import Create from './Create';
import Login from './Login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Main from './Main'
export default function App(){
    return(
        <Router>

            <Nav/>

            <Routes>
                <Route path='/' element={<Main/>} />
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/create' element={<Create/>}/>
            </Routes>

        </Router>   
    )
}