import React, { useState, useEffect } from 'react'
import '../ordersmang/orderMang.css'
import TBC from '../../../../img/note.png'
import LFR from '../../../../img/avatar.png'
import OTW from '../../../../img/order-delivery.png'
import { useSelector } from 'react-redux'
import OrderDisplayMangModal from './orderModal/orderDisplayMangModal'

const OrderMang = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const orders = useSelector((state) => state.orders);
    const toBeConfirmed = orders.filter(item=> item.orderStatus=='TBC');
    const lookingForRider = orders.filter(item=> item.orderStatus=='LFR');
    const onTheWay = orders.filter(item=> item.orderStatus=='OTW');
    const [display2, setDisplay2] = useState(true);
    const [show, setShow] = useState(false);
    const [Data, setData] = useState({ });

    const [display, setDisplay] = useState(0);
    const handleClick = (str) => {
        if (str == 'TBC') {
            setDisplay(0)
        } else if (str == 'LFR') {
            setDisplay(1)
        } else {
            setDisplay(2)
        }
    }
    useEffect(() => {
        if (orders.length==0) {
            setDisplay2(true)
        } else {
            setDisplay2(false)
        }
    }, [orders])  
    const handleClickToModifyOrder = (item) => {
        setData(item)
        setShow(true);
    }
    if (user?.result?.name && user?.result.userStatus=='admin') {
    return (
        <div id='order_manger'>
            <div id='orders_navbar'>
                    <button className='btn btn-light btn-sm langbtn' onClick={() => handleClick('TBC')}>
                       To Be Confirmed<span class="badge bg-danger ms-2">{toBeConfirmed.length}</span>
                    </button>
                    |
                    <button className='btn btn-light btn-sm langbtn' onClick={() => handleClick('LFR')}>
                        Looking For Rider<span class="badge bg-danger ms-2">{lookingForRider.length}</span>
                    </button>
                    |
                    <button className='btn btn-light btn-sm langbtn' onClick={() => handleClick('OTW')}>
                        On The Way<span class="badge bg-danger ms-2">{onTheWay.length}</span>
                    </button>
            </div>
            {display == 0? 
            <div id='orders_switch'>
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
                    <div id='orders_list'>
                    {toBeConfirmed.map(item=> 
                        <div key={item._id} className='order_item_card' style={{padding: '5px'}}>
                          <img className='order__img' src={TBC}/>
                          <div className='order_details'>
                            <label style={{textAlign: 'center'}}>New Order, <span style={{wordBreak: 'break-all'}}>{item._id}</span></label>
                           </div>
                           <button style={{height: '100%'}} onClick={()=> handleClickToModifyOrder(item)} className='btn btn-block btn-dark btn_orders_mang'><i class="fas fa-pencil-alt"></i></button>
                        </div>
                        )}
            </div>}
            </div>
            : display == 1? 
            <div id='returned_switch'>
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
                <div id='orders_list'>
                {lookingForRider.map(item=> 
                        <div key={item._id} className='order_item_card' style={{padding: '5px'}}>
                          <img className='order__img' src={LFR}/>
                          <div className='order_details'>
                            <label style={{textAlign: 'center'}}>We Need A Rider For Order <span style={{wordBreak: 'break-all'}}>{item._id}</span></label>
                           </div>
                           <button style={{height: '100%'}} onClick={()=> handleClickToModifyOrder(item)} className='btn btn-block btn-dark btn_orders_mang'><i class="fas fa-pencil-alt"></i></button>
                        </div>
                        )}
            </div>}
            </div>
          : <div id='archive_switch'>
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
              <div id='orders_list'>
              {onTheWay.map(item=> 
                        <div key={item._id} className='order_item_card' style={{padding: '5px'}}>
                          <img className='order__img' src={OTW}/>
                          <div className='order_details'>
                            <label style={{textAlign: 'center'}}>Order <span style={{wordBreak: 'break-all'}}>{item._id}</span> Is On The Way</label>
                           </div>
                           <button style={{height: '100%'}} onClick={()=> handleClickToModifyOrder(item)} className='btn btn-block btn-dark btn_orders_mang'><i class="fas fa-pencil-alt"></i></button>
                        </div>
                        )}
            </div>}
            </div> }
            <OrderDisplayMangModal
            show={show}
            order_data= {Data}
            onHide={() => setShow(false)}
            />
        </div>
    )
} else {
    window.location.replace("/");
}
}

export default OrderMang
