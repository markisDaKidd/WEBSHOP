import React, { useState,useEffect, useMemo,Fragment } from 'react';
import cookies from'js-cookie'
import Card from './Card';

export default function Main(){
    let [cosmetics,setData]=useState(null)
    const [blur,setBlur] = useState(false)
    const [cardItem,setCardItem]=useState({})

    const GetData=async ()=>{
        if(localStorage.getItem('data')){
            setData(JSON.parse(localStorage.getItem('data')))
            return
        }
        let res = await fetch('https://fortnite-api.theapinetwork.com/items/list')
        let resp = await res.json()
        let slice = resp.data.slice(1,31)
        let response =slice
        localStorage.setItem('data',JSON.stringify(response))
        
        setData(response)
    }
    
    
    useEffect(()=>{
       
        GetData()
        console.log(cosmetics);
        
    },[])
   
    return (

        <main className={blur?'blur':''}>


            {cosmetics?cosmetics.map((x,idx)=><Fragment key={idx}><Card  item={x}/></Fragment>):'loading'} 


        </main>
    )
    
}