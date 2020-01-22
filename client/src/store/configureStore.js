import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notesReducer from '../reducers/notes'
import categoriesReducer from '../reducers/categories'
import userReducer from '../reducers/user'

const configureStore=()=>{
    const store=createStore(combineReducers({
        notes:notesReducer,
        categories:categoriesReducer,
        user:userReducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore
