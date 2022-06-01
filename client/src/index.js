import React,{createContext, useState} from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import App from './components/App';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import Items from './Redux/reducers'
import {persistStore,persistReducer} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'


let context = createContext()
let config ={
  key:'root',
  storage,
}
let ItemsPersist = persistReducer(config,Items)
let store = createStore(ItemsPersist,window._REDUX_DEVTOOLS_EXTENSION_,applyMiddleware(thunk))
let persistor = persistStore(store)



ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<div>loading...</div>}>
            <App />
        </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);




