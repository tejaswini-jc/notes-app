import React from 'react'
import {Link} from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

function NoteShow(props){
    return (
            <div className="container col-md 5 offset-md-3">
                {
                    !_.isEmpty(props.note) && (
                        <div className="container">
                            <p className="h2">{props.note.title}-{props.note.body}-{props.note.category.name}</p>
                            <div className="container col-md 3 offset-md-1">
                            <Link to='/notes'><button type="button" className="btn btn-secondary">Back</button></Link>
                            </div>
                        </div>
                    )
                }
            </div>
        )
}

const mapStateToProps=(state,props)=> {
    const id=props.match.params.id
    return{
        note:state.notes.find(note => note._id === id)
    }
}

export default connect(mapStateToProps)(NoteShow)