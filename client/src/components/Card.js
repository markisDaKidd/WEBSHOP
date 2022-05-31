import React,{useState,useRef,memo, useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { ADD } from '../Redux/actions';



 const Card=memo(({item})=>{
    let [count,setCount]=useState(0)
    let buttonRef=useRef()
    let state_items=useSelector(state=>(state.Items))
    let plus_minusRef=useRef()
    let dispatch=useDispatch()

    const handleButton=()=>{
        if (buttonRef.current.classList.contains('add-to-cart')) {
            dispatch(ADD(state_items,count,item.itemId,item.item.images.icon,item.item.name))
            console.log(state_items);
            buttonRef.current.classList.toggle('add-to-cart')
            plus_minusRef.current.classList.toggle('plus-minus-cont-display')
            buttonRef.current.innerHTML='BUY'
            return
        }

        buttonRef.current.classList.toggle('add-to-cart')
        buttonRef.current.innerHTML='ADD'
        plus_minusRef.current.classList.toggle('plus-minus-cont-display')
      
    }

    useEffect(()=>{
        console.log(count);
    },[count])

    
    return(
        <div>
             <div className='card-cont'>
                <p className='card-head'>{item.item.name}</p>
                <div className='img-cont'>
                    <img  className='img-card' src={item.item.images.icon} alt="" />
                </div>
                  
            </div>

            <div className='buy-cont'>
                <button ref={buttonRef} className='buy-button' onClick={handleButton} >
                    BUY
                </button>
                <div ref={plus_minusRef}className='plus-minus-cont'>
                    <button onClick={()=>setCount(count+1)} className='plus-minus'>+</button>
                        <div style={{color:'white'}}>
                        {count}
                        </div>
                    <button onClick={()=>setCount(state=>state===0?state:state-1)} className='plus-minus'>-</button>

                </div>
            </div>

        </div>
    )
})

export default Card