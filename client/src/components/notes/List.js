import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {startRemoveNote} from '../../actions/notes'

function NoteList(props){
    const handleRemove=(id)=>{
        props.dispatch(startRemoveNote(id))
    }
    console.log(props)
        return(
            <div className="container col-md-8">
                <p className="h2 text-center">Listing notes - {props.notes.length}</p>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Body</th>
                            <th scope="col">Category</th>
                            <th scope="col">Actions</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           props.notes.map((note)=>{
                                return<tr key={note._id}>
                                        <td>{note.title}</td>
                                        <td>{note.body}</td>
                                        <td>{note.category ? note.category.name : ''}</td>
                                        <td><Link to={`/notes/edit/${note._id}`}><button type="button" className="btn btn-primary">Edit</button></Link><Link to={`notes/${note._id}`}><button type="submit" className="btn btn-primary">Show</button></Link></td>
                                        <td><button type="submit" className="btn btn-danger"
                                        onClick={()=>{                                            
                                        const confirmRemove=window.confirm("Are you sure?")
                                            if(confirmRemove){
                                                handleRemove(note._id)
                                            }
                                        }} >Remove</button></td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table><hr/>
                <Link to="/notes/new"><button type="button" className="btn btn-secondary">Add Note</button></Link>
            </div>
        )
}

const mapStateToProps=(state)=>{
    return{
        notes:state.notes
    }
}
export default connect(mapStateToProps)(NoteList)