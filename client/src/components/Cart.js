import React, { useEffect } from 'react';
import Nav from './Nav';
import { useSelector } from 'react-redux';


export default function Cart(){
    let item_state = useSelector(state=>(state.Items))

    useEffect(()=>{
        console.log(item_state);
    },[])

    return(
            <main>

                    { Object.keys(item_state).map((val)=>(
                    <div key ={val} className='cart-container'>
                        <div>
                            <img className='img-cart' src={item_state[val].image} alt="" />
                        </div>
                        <div>
                            <div>{item_state[val].name}</div>
                            <div>{val}</div>
                            <div>{item_state[val].count}</div>
                        </div>
                    </div>)
                    )}

            </main>
    )
}