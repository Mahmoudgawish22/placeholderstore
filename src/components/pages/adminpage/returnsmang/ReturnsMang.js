import React, { useState, useEffect } from 'react'
import '../returnsmang/returnsMang.css'
import TBC from '../../../../img/request.png'
import { useSelector } from 'react-redux'
import ReturnModalMang from './returnsModal/returnsModalMang'


const ReturnsMang = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const returns =  useSelector((state)=> state.returns);
    const [show, setShow] = useState(false);
    const [Data, setData] = useState({ });
    const [display2, setDisplay2] = useState(true);


    const handleDisplayReturn = (item) => {
        setData(item)
        setShow(true);
    }
    useEffect(() => {
        if (returns.length==0) {
            setDisplay2(true)
        } else {
            setDisplay2(false)
        }
    }, [returns])  

    if (user?.result?.name && user?.result.userStatus=='admin') {
    return (
        <div id='returns_mang'>
            <div id='orders_navbar'>
                    <button className='btn btn-light btn-sm langbtn'>
                       Returns Requests<span class="badge bg-danger ms-2">{returns.length}</span>
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
                </div> :
                <div id='orders_list'>
                    {returns.map(item=> 
                        <div key={item._id} className='order_item_card' style={{padding: '5px'}}>
                        <img className='order__img' src={TBC}/>
                        <div className='order_details'>
                            <label style={{fontWeight: 'bold', textAlign: 'center'}}>New Return Request For Order {item._id}</label>
                        </div>
                        <button onClick={()=> handleDisplayReturn(item)} className='btn btn-block btn-dark btn_returns_mang'><i class="fas fa-pencil-alt"></i></button>
                      </div>
                        )}
                 
                </div>}
            </div>
            <ReturnModalMang
            show={show}
            return_data= {Data}
            onHide={() => setShow(false)}
            />
        </div>
    )
} else {
    window.location.replace("/");
}
}

export default ReturnsMang
