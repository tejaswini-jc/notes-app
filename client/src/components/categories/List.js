import React from 'react'
import {Link} from 'react-router-dom'
import CategoryForm from './Form'
import { connect } from 'react-redux'
import {startRemoveCategory} from '../../actions/categories' 
import {startAddCategory} from '../../actions/categories'
 
function CategoryList(props){
    
    const handleRemove=(id)=>{
        props.dispatch(startRemoveCategory(id))
    }
    const handleSubmit=(formData)=>{
        props.dispatch(startAddCategory(formData, props))
    }
    return(
        <div className="container " >
            <div className="container col-md-4">
                <p className="h3 text-center">Categories-{props.categories.length}</p>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Actions</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           props.categories.map((category)=>{
                                return<tr key={category._id}>
                                    <td>{category.name}</td>
                                    <td><div className="btn-group" role="group" aria-label="Basic example">
                                    <Link to={`categories/edit/${category._id}`}><button type="button" className="btn btn-primary">Edit</button></Link>
                                    <Link to={`categories/${category._id}`}><button type="button" className="btn btn-secondary">Show</button></Link> </div></td>  
                                    <td><button type="button" className="btn btn-danger" onClick={()=>{              const confirmRemove=window.confirm("Are you sure?")
                                        if(confirmRemove){
                                            handleRemove(category._id)
                                        }
                                    }} >Remove</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table><hr/>
                <CategoryForm handleSubmit={handleSubmit}/>
            </div>
        </div>
        )
}

const mapStateToProps=(state)=>{
    return{
        categories:state.categories
    }
}
export default connect(mapStateToProps)(CategoryList)