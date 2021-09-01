import React from 'react'
import '../ourServices/ourserv.css'
import logo from '../../../../img/shopping-cart.svg'
import fast from '../../../../img/food-delivery.png'
import quality from '../../../../img/medal.png'
import bestSalary from '../../../../img/wage.png'

function OurServ(props) {
    return (
        <div id='our_services'>
            <img className='discrbicon' src={logo} alt='arkan'/>
                <div id='discrbcontent'>
                    <p id='discrbtitle'>
                       Why Placeholder Store?
                    </p>
                    <p id='discrbsubcontent'>
                    In an effort to keep pace with the new world, and during the spread of the Corona virus, we decided to create this online clothing store, without the need for customers to come down and mingle with the crowd as much as possible.
That is why we offer many services that we hope you will like, including:
                    </p>
                </div>
                <div id='props'>
                    <div className='prop'>
                        <img className='discbicon' src={fast} alt='novels'/>
                        <p className='icondiscrb'>
                            Fast Delivery
                            </p>
                    </div>
                    <div className='prop'>
                        <img className='discbicon' src={quality} alt='novels'/>
                        <p className='icondiscrb'>
                             Perfect Quality
                            </p>
                    </div>
                    <div className='prop'>
                        <img className='discbicon' src={bestSalary} alt='novels'/>
                        <p className='icondiscrb'>
                             Good Price 
                            </p>
                    </div>
                </div>
        </div>
    )
}
export default OurServ