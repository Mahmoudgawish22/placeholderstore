import React, { useState, useEffect } from 'react'
import '../orderspage/orders.css'
import product from '../../../img/loading.png'
import HM from '../../../img/order-delivery.png'
import done from '../../../img/checkmark.png'
import { useSelector } from 'react-redux'
import OrderDisplayModal from './OrderDisplayForUser/orderDisplayModal'
import ReturnModal from './OrderDisplayForUser/returnModal'


export default function Orders(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const ordersWeNeed =  useSelector((state)=> state.orders).filter(item=> item.user==user?.result._id);
    const countOfWaitngOrders = ordersWeNeed.filter(item=> item.orderStatus!=='Done');
    const countOfDoneOrders = ordersWeNeed.filter(item=> item.orderStatus=='Done');
    const [Data, setData] = useState({ });
    const [display2, setDisplay2] = useState(true);
    const [show, setShow] = useState(false);
    const [returnShow, setReturnShow] = useState(false);

    const handleClickToShowOrder = (item) => {
        setData(item)
        setShow(true);
    }
    const handleClickToBackReq = (item) => {
        setData(item)
        setReturnShow(true);
    }
    useEffect(() => {
        if (ordersWeNeed.length==0) {
            setDisplay2(true)
        } else {
            setDisplay2(false)
        }
    }, [ordersWeNeed])   

    const [display, setDisplay] = useState(0);
    const handleClick = (str) => {
        if (str == 'Or') {
            setDisplay(0)
        } else if (str == 'Re') {
            setDisplay(1)
        } else {
            setDisplay(2)
        }
    }
    if (user?.result?.name) {
    return (
        <div id='orders'>
            <div id='orders_navbar'>
                    <button className='btn btn-light btn-sm langbtn' onClick={() => handleClick('Or')}>
                        Orders<span class="badge bg-danger ms-2">{countOfWaitngOrders.length}</span>
                    </button>
                    |
                    <button className='btn btn-light btn-sm langbtn' onClick={() => handleClick('Ar')}>
                        Archive<span class="badge bg-danger ms-2">{countOfDoneOrders.length}</span>
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
                    {ordersWeNeed.slice(0).reverse().map(item=> 
                        item.orderStatus=='TBC' | item.orderStatus=='LFR'?
                        <div key={item._id} className='order_item_card' style={{padding: '5px'}}>
                          <img className='order__img' src={product}/>
                          <div className='order_details'>
                            <label style={{fontWeight: 'bold', textAlign: 'center'}}>Collecting Resources For Order <span style={{wordBreak: 'break-all'}}>{item._id}</span></label>
                            <label style={{textAlign: 'center'}}><i class="fas fa-truck-loading"></i> Aproximately Deliver In 5-12 days.</label>
                           </div>
                           <button style={{height: '100%'}} onClick={()=> handleClickToShowOrder(item)} className='btn btn-block btn-dark btn_orders_mang'><i class="far fa-eye"></i></button>
                        </div> :
                        item.orderStatus=='OTW'?
                        <div key={item._id} className='order_item_card' style={{padding: '5px'}}>
                           <img className='order__img' src={HM}/>
                           <div className='order_details'>
                               <label style={{fontWeight: 'bold', textAlign: 'center'}}>Order <span style={{wordBreak: 'break-all'}}>{item._id}</span> Is On The Way, Sir</label>
                               <label><i class="fas fa-truck-loading"></i> Call Number 01005255 For Moving Details</label>
                           </div>
                           <button style={{height: '100%'}} onClick={()=> handleClickToShowOrder(item)} className='btn btn-block btn-dark btn_orders_mang'><i class="far fa-eye"></i></button>
                        </div>: 
                        null
                        )}
            </div>}
            </div>
            : display == 1? 
            <div id='returned_switch'>
                <div id='orders_list'>
                 <div className='order_item_card' style={{padding: '5px'}}>
                   <img className='order__img' src={product}/>
                   <div className='order_details'>
                       <label style={{fontWeight: 'bold', textAlign: 'center'}}>The Return Request For Order With Number 5215131 is being reviewed</label>
                   </div>
                   <button className='btn btn-block btn-dark btn_orders_mang'><i class="far fa-eye"></i></button>
                 </div>
                 <div className='order_item_card' style={{padding: '5px'}}>
                   <img className='order__img' src={HM}/>
                   <div className='order_details'>
                       <label style={{fontWeight: 'bold', textAlign: 'center'}}>Order With Number 45223456 Is On Your Way Back, Sir</label>
                       <label><i class="fas fa-truck-loading"></i> Aproximately Deliver In 4 days.</label>
                   </div>
                   <button className='btn btn-block btn-dark btn_orders_mang'><i class="far fa-eye"></i></button>
                 </div>
            </div>
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
              {countOfDoneOrders.slice(0).reverse().map(item=> 
                        item.orderStatus=='Done'?
                        <div key={item._id} className='order_item_card' style={{padding: '5px'}}>
                          <img className='order__img' src={done}/>
                          <div className='order_details'>
                            <label style={{fontWeight: 'bold', textAlign: 'center'}}>You Delivered The Order <span style={{wordBreak: 'break-all'}}>{item._id}</span>, Sir</label>
                            <label style={{textAlign: 'center'}}>Please Rate It!</label>
                           </div>
                           <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
                           <button style={{height: '100%', width: '100%', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px'}} onClick={()=> handleClickToShowOrder(item)} className='btn btn-block btn-dark'><i class="far fa-eye"></i></button>
                           <button style={{ height: '100%', width: '100%', borderTopLeftRadius: '0px', borderTopRightRadius: '0px'}} onClick={()=> handleClickToBackReq(item)} className='btn btn-block btn-danger'><i class="fas fa-undo-alt"></i></button>
                           </div>
                        </div>: 
                        null
                        )}
            </div>}
            </div> }
            <OrderDisplayModal
            show={show}
            order_data= {Data}
            onHide={() => setShow(false)}
            />
            <ReturnModal
            show={returnShow}
            return_data= {Data}
            onHide={() => setReturnShow(false)}
            />
        </div>
    )
} else {
    window.location.replace("/");
}
}