import React, { useState, useEffect } from 'react'
import '../archivemang/archiveMang.css'
import done from '../../../../img/checkmark.png'
import OrderDisplayModal from '../../orderspage/OrderDisplayForUser/orderDisplayModal'
import { useSelector } from 'react-redux'

const ArchiveMang = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const ordersWeNeed =  useSelector((state)=> state.orders).filter(item=> item.orderStatus=='Done');
    const [show, setShow] = useState(false);
    const [Data, setData] = useState({ });
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
        if (ordersWeNeed.length==0) {
            setDisplay2(true)
        } else {
            setDisplay2(false)
        }
    }, [ordersWeNeed])  
    const handleClickToShowOrder = (item) => {
        setData(item)
        setShow(true);
    }

    if (user?.result?.name && user?.result.userStatus=='admin') {
    return (
        <div id='archive_mang'>
            <div id='orders_navbar'>
                    <button className='btn btn-light btn-sm langbtn'>
                       Orders Archive<span class="badge bg-danger ms-2">{ordersWeNeed.length}</span>
                    </button>
            </div>
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
                        <div key={item._id} className='order_item_card' style={{padding: '5px'}}>
                        <img className='order__img' src={done}/>
                        <div className='order_details'>
                            <label style={{textAlign: 'center'}}>Order {item._id} Is Delivered Successfully</label>
                        </div>
                        <button onClick={()=> handleClickToShowOrder(item)} className='btn btn-block btn-dark btn_archive_mang'><i class="far fa-eye"></i></button>
                      </div>
                        )}
                 
                </div>}
            </div>
            <OrderDisplayModal
            show={show}
            order_data= {Data}
            dontDisplayTheRating='dont'
            onHide={() => setShow(false)}
            />
        </div>
    )
} else {
    window.location.replace("/");
}
}

export default ArchiveMang
