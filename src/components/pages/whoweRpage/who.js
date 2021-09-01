import React from 'react'
import '../whoweRpage/who.css'
import startUp from '../../../img/startup.svg'
import major from '../../../img/major.svg'
import minor from '../../../img/minor.svg'

export default function Who(props) {
    return (
        <div id='who'>
            <h1 style={{textAlign: 'center'}}>Who We Are?</h1>
            <br/><br/><br/>
            <div className='right_who'>
                <img src={startUp} alt='startup_who' className='who_img'/>
                <div className='who_details'>
                    <h3 style={{textAlign: 'center'}}>Idea</h3>
                    <p style={{textAlign: 'center'}}>example example example example example example example example example example example example 
            example example example example example example example example example example example example example</p>
                </div>
            </div>
            <div className='left_who'>
                <img src={major} alt='startup_who' className='who_img'/>
                <div className='who_details'>
                    <h3 style={{textAlign: 'center'}}>Major</h3>
                    <p style={{textAlign: 'center'}}>example example example example example example example example example example example example 
            example example example example example example example example example example example example example</p>
                </div>
            </div>
            <div className='right_who'>
                <img src={minor} alt='startup_who' className='who_img'/>
                <div className='who_details'>
                    <h3 style={{textAlign: 'center'}}>Minor</h3>
                    <p style={{textAlign: 'center'}}>example example example example example example example example example example example example 
            example example example example example example example example example example example example example</p>
                </div>
            </div>
        </div>
    )


}