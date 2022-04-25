export const ADD=(count,id,image,name)=>{
    return {type:'ADD-ITEM',id:id,count:count,image:image,name:name }
}

export const DECR=(id)=>{
    return {
        type:'DEL-ITEM',
        id:id
    }
}

export const LOGIN=(username,email)=>{
    return{
        type:'LOGIN',username,email
    }
}

export const LOGOUT=()=>{
    return {
        type:'LOGOUT'
    }
}