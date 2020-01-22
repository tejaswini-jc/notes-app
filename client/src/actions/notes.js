import axios from 'axios'

export const setNotes = (notes) => {
    return{
        type:'SET_NOTES',
        payload:notes
    }
}

export const startSetNotes = () => {
    return(dispatch) => {
        axios.get('http://localhost:3025/notes',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const notes=response.data
            dispatch(setNotes(notes))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const removeNote =(id)=>{
    return{
        type:'REMOVE_NOTE',
        payload:id
    }
}

export const startRemoveNote=(id)=>{
    return(dispatch)=>{
        axios.delete(`http://localhost:3025/notes/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            dispatch(removeNote(response.data._id))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const addNote = (note) => {
    return{
        type:'ADD_NOTE',
        payload:note
    }
}

export const startAddNote = (formData, props) => {
    return(dispatch) => {
        axios.post('http://localhost:3025/notes',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.errors.message)
            }else{
                const note=response.data
                dispatch(addNote(note))
                props.history.push(`/notes/${note._id}`)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const editNote = (note) => {
    return{
        type:'EDIT_NOTE',
        payload:note
    }
}

export const startEditNote = (formData, props) => {
    const id=props.match.params.id
    return(dispatch) => {
        axios.put(`http://localhost:3025/notes/${id}`, formData, {
            headers:{
                'x-auth' : localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors.message)
                } else {
                    const note = response.data
                    dispatch(editNote(note))
                    console.log(note)
                    props.history.push(`/notes/${note._id}`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


