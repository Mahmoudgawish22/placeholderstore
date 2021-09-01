import React, { useState, useEffect } from 'react'
import '../editoffers/editOffers.css'
import { useSelector } from 'react-redux'
import EditOfferModal from './offersModal/editOfferModal'

const EditOffers = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const offers = useSelector((state) => state.offers);
    const [show, setShow] = useState(false);
    const [Data, setData] = useState({ });

    const handleClick = (item) => {
        setData(item)
        setShow(true);
    }
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
      if (offers.length==0) {
          setDisplay2(true)
      } else {
          setDisplay2(false)
      }
  }, [offers]) 
    if (user?.result?.name && user?.result.userStatus=='admin') {
    return (
      <div style={{width: '100%'}}>
        {display2? 
               <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px'}}>
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
        <div id='edit_offers'>
          {offers.slice(0).reverse().map(item => 
            <div key={item._id} className='offer_display'>
            <div className='offer_img_display'>
              <label style={{fontSize: '20px'}}>#{item.promoCode}</label>
            </div>
            <button onClick={()=> handleClick(item)} className='btn btn-block btn-dark btn-offer'><i class="fas fa-pencil-alt"></i></button>
          </div>
            )}
              <EditOfferModal
                 show={show}
                 offer_data= {Data}
                 onHide={() => setShow(false)}
              />
        </div>}
        </div>
    )
  } else {
    window.location.replace("/");
}
}

export default EditOffers
