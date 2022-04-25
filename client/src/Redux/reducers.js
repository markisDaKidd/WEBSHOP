// import { combineReducers } from "redux"

//  const Items=(state=new Map(),action)=>{
//     switch (action.type) {
//         case 'ADD-ITEM':
//              if (state.has(action.id)) {
//                  return state.set(action.id,{...state.get(action.id),count:state.get(action.id).count+action.count})
//              }
//              return state.set(action.id,{count:action.count,image:action.image,name:action.name})
//         case 'DEL-ITEM':
//             if (state.get(action.id).count===0) {
//                 return state.remove(action.id)
//             }
//             return state.set(action.id,{...state.get(action.id),count:state.get(action.id).count-1})
//         default:
//             return state
//     }
// }

// export default combineReducers({Items})
import { combineReducers } from "redux"

 const Items=(state={},action)=>{
     let id = action.id;
    switch (action.type) {
        case 'ADD-ITEM':
             if (state.hasOwnProperty(action.id)) {
                 return {
                     ...state,
                     [id]:{...state[id],count:state[id].count+action.count}
                 }
             }

             return{
                 ...state,
                 [id]:{count:action.count,image:action.image,name:action.name}
             }

        case 'DEL-ITEM':
            if (state[action.id].count===0) {
                return delete state[action.id]
            }
            return state[action.id]={...state[action.id],count:state[action.id].count-1}

        case 'LOGOUT':
            return {}
        default:
            return state
    }
}

const User=(state={},action)=>{
    switch (action.type) {
        case "LOGIN":
            return{
                username:action.username,
                email:action.email
            }

        case "LOGOUT":
            return {}
    
        default:
            return state
    }

}

export default combineReducers({Items,User})
