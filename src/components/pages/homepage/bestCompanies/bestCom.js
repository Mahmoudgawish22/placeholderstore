import React, { useState, useEffect } from "react";
import '../bestCompanies/bestCom.css'
import Carousel from 'react-bootstrap/Carousel'
import { useSelector } from 'react-redux'



function BestCom(props) {
    const [index, setIndex] = useState(0);
    const companies = useSelector((state) => state.companies);
    const soreted = [].concat(companies.sort(function(a, b){return a.products - b.products}));
    const bestThree = soreted.slice(soreted.length-3);
   
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
      if (companies.length==0) {
          setDisplay2(true)
      } else {
          setDisplay2(false)
      }
  }, [companies])  
    return (
        <div id='best_com'>
            <label style={{fontSize: '27px'}} className='section__title'>Best 3 Companies For All Time</label>
            {display2? 
               <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px'}}>
               <div class="spinner-boxh" >
                 <div class="configure-border-1h">  
                 <div class="configure-coreh"></div>
                 </div>  
                 <div class="configure-border-2h">
                 <div class="configure-coreh"></div>
                 </div> 
                        </div>
               </div> 
              :
            <Carousel controls={false} activeIndex={index} onSelect={handleSelect} style={{width: '100%'}}> 
            {bestThree.map(item=> 
                <Carousel.Item key={item._id}>
                <div className='com_SlideShow'>
                <img src={item.logo} alt='company_logo' className='company_logo_S'/>
                </div>
            </Carousel.Item>
                )}
            </Carousel>}
        </div>
    )
}
export default BestCom