import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import NoteForm from './Form'
import {startEditNote} from '../../actions/notes'

function NoteEdit(props){

    const handleSubmit = (formData) => {
        props.dispatch(startEditNote(formData, props))
    }
    return(
            <div className="container">
                {
                    !_.isEmpty(props.note) && (
                        <div>
                            <p className="h2 text-center">Edit Note - {props.note.title}</p>
                            <NoteForm {...props.note} handleSubmit={handleSubmit} />
                        </div>
                    )
                }
            </div>   
        )
    }

const mapStateToProps=(state, props) => {
    return{
        note:state.notes.find(note => note._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(NoteEdit)