import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import CategoryForm from './Form'
import {startEditCategory} from '../../actions/categories'

function CategoryEdit(props){

    const handleSubmit = (formData) => {
        const redirect = () => props.history.push(`/categories`)
        props.dispatch(startEditCategory(formData, props, redirect))
    }
    return(
            <div className="container col-md-5">
                {
                    !_.isEmpty(props.category) && (
                        <div>
                            <p className="h2 text-center">Edit Category - {props.category.name}</p>
                            <CategoryForm {...props.category} handleSubmit={handleSubmit} />
                        </div>
                    )
                }
            </div>   
        )
    }
const mapStateToProps=(state, props) => {
    return{
        category:state.categories.find(category => category._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(CategoryEdit)