import React, { useEffect } from 'react';
import { DECR } from '../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';





export default function Cart(){
    let item_state = useSelector(state=>(state.Items))
    let dispatch = useDispatch()
    let handleFetch=()=>{
        fetch('http://localhost:3000/checkout',{headers:{ 'Accept': 'application/json','Content-Type': 'application/json'},
        method:'POST',credentials:'include'}).then(res=>res.json()).then(res=>{
            console.log(res);
            window.location.href=res.url

        })   
    }
    let PayButton=<section className='stripe-section'>
        <button onClick={handleFetch}>PAY HERE</button>

    </section>

    return(
            <main>

                    { Object.keys(item_state).map((val)=>(
                    <div key ={val} className='cart-cont'>
                        <div>
                            <img className='img-cart' src={item_state[val].image} alt="" />
                        </div>
                        <div>
                            <div>{item_state[val].name}</div>
                            <div>{item_state[val].count}</div>
                            <button onClick={()=>{
                                console.log('delete',item_state[val], val);
                                dispatch(DECR(val))}}>remove</button>
                        </div>
                    </div>)
                    )}

                    {Object.keys(item_state).length?PayButton:''}

            </main>

        
    )
}