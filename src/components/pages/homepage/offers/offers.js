import React, { useState, useEffect } from "react";
import '../offers/offers.css'
import { useSelector } from 'react-redux'


function Offers(props) {
    const offersImgs = useSelector((state) => state.offersImg);
    const othersOffersImgsWide = offersImgs.slice(3,5)
    const othersOffersImgsTall = offersImgs.slice(5)
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
      if (offersImgs.length==0) {
          setDisplay2(true)
      } else {
          setDisplay2(false)
      }
  }, [offersImgs]) 
    
    return (
        <div id='offers'>
            <div id='offers__title'>
                <label style={{fontSize: '27px'}} className='section__title'><i className="fas fa-cart-plus"></i> Special Offers</label>
            </div>
            {display2? 
               <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px'}}>
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
            <div id='offers__others'>
                <div id='left__offers'>
                    {othersOffersImgsWide.map(item=> 
                    <img key={item._id} className='carsousel' style={{height: '250px', width: '100%', borderRadius: '10px', objectFit: 'cover'}} src={item.photo}/>

                        )}
                </div>
                <div id='right__offers'>
                    {othersOffersImgsTall.map(item=> 
                    <img key={item._id} className='carsousel' style={{height: '505px', width: '100%', borderRadius: '10px', objectFit: 'cover'}} src={item.photo}/>

                        )}
                </div>
            </div>}
        </div>
    )
}
export default Offers