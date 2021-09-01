import React from 'react'
import '../trendySections/trendysections.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


function TrendySections(props) {
    const types = useSelector((state)=> state.types);
    const history = useHistory();
    const openPosts = (id) => {history.push(`/products/${id}`)}

    return (
        <div id='trendySec'>
            <label className= 'trendy_sections_title'>
                Hi Placeholder, I need a..
            </label>
            <div id='sections'>
                {types.map(item=> 
                    <a key={item._id} style={{cursor: 'pointer'}} onClick={()=> openPosts(item.name)} className='section'>
                    <img src={item.photo} alt='for__men' className='section__photo'/>
                    {item.name}
                </a>
                    )}
            </div>
            <label className= 'trendy_sections_title'>
                hmmm, Thanks, I need to discover by my self <i class="fas fa-arrow-down"></i>
            </label>
        </div>
    )
}
export default TrendySections