import axios from 'axios'

export const setCategories = (categories) => {
    return{
        type:'SET_CATEGORIES',
        payload:categories
    }
}

export const startSetCategories = () => {
    return(dispatch) => {
        axios.get('http://localhost:3025/categories',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const categories=response.data
            dispatch(setCategories(categories))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const removeCategory =(id)=>{
    return{
        type:'REMOVE_CATEGORY',
        payload:id
    }
}

export const startRemoveCategory=(id)=>{
    return(dispatch)=>{
        axios.delete(`http://localhost:3025/categories/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            dispatch(removeCategory(response.data._id))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}


export const addCategory = (category) => {
    return{
        type:'ADD_CATEGORY',
        payload:category
    }
}

export const startAddCategory = (formData) => {
    return(dispatch) => {
        axios.post('http://localhost:3025/categories',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.errors.message)
            }else{
                const category=response.data
                dispatch(addCategory(category)
            )}
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const editCategory = (category) => {
    return{
        type:'EDIT_CATEGORY',
        payload:category
    }
}

export const startEditCategory = (formData, props) => {
    return(dispatch) => {
        axios.put(`http://localhost:3025/categories/${props.match.params.id}`, formData, {
            headers:{
                'x-auth' : localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors.message)
                } else {
                    const category = response.data
                    dispatch(editCategory(category))
                    props.history.push(`/categories/${category._id}`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}