import axios from 'axios'
import {setNotes} from './notes'
import {setCategories} from './categories'

export const setUser=(user={})=>{
    return{
        type:'SET_USER',
        payload:user
    }
}

export const startRegisterUser=(formData,props)=>{
    return(dispatch)=>{
        axios.post('http://localhost:3025/users/register',formData)
       .then((response)=>{
           if(response.data.hasOwnProperty('errors')){
               alert(response.data.message)
           }else{
               alert('successfully registered')
               dispatch(setUser())
               props.history.push('/users/login')
           }
       })
       .catch((err)=>{
           console.log(err)
       })
    }
}
export const startLoginUser=(formData,props)=>{
    return(dispatch)=>{
        axios.post('http://localhost:3025/users/login',formData)
       .then((response)=>{
           if(response.data.error){
               alert(response.data.error)
           }else{
               const token=response.data.token
               localStorage.setItem('authToken',token)

               Promise.all([axios.get('http://localhost:3025/users/account',{
                   headers:{
                       'x-auth':token
                   }
               }),axios.get('http://localhost:3025/notes',{
                    headers:{
                        'x-auth':token
                    }
               }),axios.get('http://localhost:3025/categories',{
                headers:{
                    'x-auth':token
                }
           })])
               .then(values=>{
                   const [userResponse, notesResponse, categoriesResponse]=values
                   dispatch(setUser(userResponse.data))
                   dispatch(setNotes(notesResponse.data))
                   dispatch(setCategories(categoriesResponse.data))
                   props.history.push('/')
               })
           }
       })
       .catch((err)=>{
           console.log(err)
       })
    }
}

export const startGetUser=()=>{
    return(dispatch)=>{
        axios.get('http://localhost:3025/users/account',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const user=response.data
            dispatch(setUser(user))
        })
    }
}

export const startLogoutUser=()=>{
    return (dispatch)=>{
        axios.delete('http://localhost:3025/users/logout',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('notice')){
                localStorage.removeItem('authToken')
                dispatch(setUser({}))
                window.location.href='/users/login'
            }
        })
    }
}