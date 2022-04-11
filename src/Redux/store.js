import firebase from "firebase";
import _ from 'lodash'
var redux = require("redux");


const getIdLocal = () => {
  
  const local = localStorage.getItem("ID");
  

  if(local == null)
  {
    localStorage.setItem("ID","[]");
    return JSON.parse("[]");
  }

  let DataID = [{}]
  try
    {
      DataID  =  JSON.parse(local);
     
      console.log("xxxxxxxx");
    }catch{
      console.log("catch");
      DataID  =  JSON.parse("[]");
    }
    return DataID;
}



const noteInitialState = {
  dataIdLocal: getIdLocal(),
  dataCart : []
};

const reducer = (state = noteInitialState, action) => {
  switch (action.type) {
    
    case 'GET_ID_LOCAL': {
      return {...state}
      }
    
    case 'ADD_ID_LOCAL' : {
      return {...state,
        dataIdLocal : [...state.dataIdLocal, {id : action.value}]
      }
    }

    default:
      return state;
  }
};

var store = redux.createStore(reducer);

store.subscribe(function () {
  console.log(JSON.stringify(store.getState()));
});

export default store;
