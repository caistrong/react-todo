import React from 'react'
import {connect} from 'react-redux'
import {selectFilter} from '../actions'

const Tag = ({active,tag,tagName,onSelectFilter})=>{
    return(
        <div className="tag" onClick={()=>{onSelectFilter(tag)}} >
           <input className="tag-checkbox" id={tag} type="radio" value={tag} name="filter" checked={active}/>
           <label className="tag-label" for={tag} >{tagName}</label>
        </div>
    )
}

const mapStateToProps = (state, ownProps)=>{
    return {
        active: state.filter === ownProps.tag
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onSelectFilter: (filter)=>{
            dispatch(selectFilter(filter))
        } 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tag)