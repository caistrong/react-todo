import React from 'react'
import Tag from './Tag'
import {ALL,DONE,PENDING} from '../filterTypes'
import './style.css'


const FilterBar = () => {
    return (
        <nav>
            <ul className="tagbar">
            <Tag tag={ALL} tagName="全部"/>
            <Tag tag={DONE} tagName="完成"/>
            <Tag tag={PENDING} tagName="待办"/>
            </ul>
        </nav>
    )
}

export default FilterBar