import React from 'react'
import NoteForm from './Form'
import {connect} from 'react-redux'
import {startAddNote} from '../../actions/notes'

function NoteNew(props){
    const handleSubmit=(formData)=>{
        props.dispatch(startAddNote(formData, props))
    }
        return(
            <div className="container">
                <p className="h2 text-center">Add Note</p>
                <NoteForm handleSubmit={handleSubmit} />
            </div>
        )
}
export default connect()(NoteNew)