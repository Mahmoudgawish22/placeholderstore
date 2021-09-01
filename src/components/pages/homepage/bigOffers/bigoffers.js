import React, { useState, useEffect } from "react";
import '../bigOffers/bigoffers.css'
import Carousel from 'react-bootstrap/Carousel'
import { useSelector } from 'react-redux'


function BigOffers(props) {
    const [index, setIndex] = useState(0);
    const offersImgs = useSelector((state) => state.offersImg);
    const slideShowOffersImg = offersImgs?.slice(0,3)
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
      if (offersImgs.length==0) {
          setDisplay2(true)
      } else {
          setDisplay2(false)
      }
  }, [offersImgs])  
    return (
        <div id='big__offers'>
            <div id='offers__slideshow'>
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
            <Carousel activeIndex={index} onSelect={handleSelect}> 
            {slideShowOffersImg.map(item=> 
                <Carousel.Item>
                <div key={item._id} className='slideshowitem'>
                <img style={{height: '300px', width: '100%', objectFit: 'cover'}} src={item.photo}/>
                </div>
            </Carousel.Item>
                )}
        </Carousel>}
            </div>
        </div>
    )
}
export default BigOffers