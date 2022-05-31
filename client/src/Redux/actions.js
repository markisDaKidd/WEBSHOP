import Cookies from "js-cookie"


// cart:{...state,[id]:{...state[id],count:state[id].count+countt}}

export const ADD=(state,countt,idd,imagee,namee)=>{


    return (dispatch)=>{

        if (Cookies.get('user')) {
            let cart
            if (state.hasOwnProperty(idd)) {
                cart= {
                    ...state,
                    [idd]:{...state[idd],count:state[idd].count+countt}
                }
            }
            else{
                cart={
                    ...state,
                    [idd]:{count:countt,image:imagee,name:namee}
                }
            } 

            fetch('http://localhost:8080/cart?q=add',{headers:{ 'Accept': 'application/json','Content-Type': 'application/json'},
        method:'PUT',credentials:'include',body:JSON.stringify({cart})}).then(res=>res.json()).then(res=>{

            dispatch({type:'ADD-ITEM',id:idd,count:countt,image:imagee,name:namee })

            })  
        }
        else{
            dispatch({type:'ADD-ITEM',id:idd,count:countt,image:imagee,name:namee })
        }

         
    }
    
}

export const DECR=(keyy)=>{
    return (dispatch)=>{
        dispatch({type:'UPDATE-SERVER'})

        fetch('http://localhost:8080/cart?q=delete',{headers:{ 'Accept': 'application/json','Content-Type': 'application/json'},
        method:'PUT',credentials:'include',body:JSON.stringify({key:keyy})}).then(res=>res.json()).then(res=>{

            dispatch({type:'DEL-ITEM',key:keyy})

        })   
    }
}

export const LOGIN=(state)=>{
    return (dispatch)=>{

        fetch('http://localhost:8080/cart?q=login',{headers:{ 'Accept': 'application/json','Content-Type': 'application/json'},
        method:'PUT',credentials:'include',body:JSON.stringify({cart:state})}).then(res=>res.json()).then(res=>{
        let data = res.answer==='exists'?res.cart :state
            console.log(data);
            dispatch({type:'COPY',copy:data })

        })   
    }

    
}

export const LOGOUT=()=>{
    return (dispatch)=>{
        dispatch({type:'LOGOUT'})
    }
}

