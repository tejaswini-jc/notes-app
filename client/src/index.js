import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'

import configureStore from './store/configureStore'

import {startSetNotes} from './actions/notes'
import {startSetCategories} from './actions/categories'
import {startGetUser} from './actions/user'

const store=configureStore()
console.log(store.getState())

store.subscribe(()=>{
    console.log(store.getState())
})

if(localStorage.getItem('authToken')){
    store.dispatch(startSetNotes())
    store.dispatch(startGetUser())
}

store.dispatch(startSetCategories())

const jsx=(
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));