import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoadingModal from '../../mainModals/loadingModal'
import DoneModal from '../../mainModals/doneModal'
import { useSelector } from 'react-redux'
import { createOrder } from '../../../../actions/orders'
import OrderDisplayCom from './orederDisplayCom'
import replace from '../../../../img/Placeholder.png'



function OrderDisplayModal(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userWeNeed = useSelector((state)=> state.users).filter(item=> item._id==props.order_data.user);

  const [DataForm, SetDataForm] = useState({
    user: props.order_data.user,
    paymentMethod: props.order_data.paymentMethod,
    products: props.order_data.products,
    totalPrice: props.order_data.totalPrice,
    orderStatus: props.order_data.orderStatus
  })
  useEffect(() => {
    SetDataForm({
        user: props.order_data.user,
        paymentMethod: props.order_data.paymentMethod,
        products: props.order_data.products,
        totalPrice: props.order_data.totalPrice,
        orderStatus: props.order_data.orderStatus

  });
}, [props.order_data])

  return (
      <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
          <div id='editing_company' style={{padding: '20px', gap: '10px'}}>
              <div style={{width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
              {DataForm.products?.map(item=> 
                <OrderDisplayCom productID={item.productId} key={item._id}
                  quantity={item.quantity} color={item.color} size={item.size} orderStatus= {DataForm.orderStatus}
                  dontDisplay= {props.dontDisplayTheRating}/>
                )}
                </div>
                <hr/>
                <div id='final_details'>
                  <div id='user_final_details'>
                    <img style={{height: '50px', width: '50px', borderRadius: '50%'}} src={userWeNeed[0]?.photo}/>
                    |
                    <label>{userWeNeed[0]?.country}</label>
                    |
                    <label>{userWeNeed[0]?.address}</label>
                    |
                    <label>{userWeNeed[0]?.phone}</label>
                    | 
                    <label> Order Date: {props.order_data.reqDate}</label>
                    | 
                    <label> Delivered In: {props.order_data.delDate}</label>
                  </div>
                  <div id='payment_method'>
                  <fieldset class="form-group" style={{flex: '2'}}>
                    <div class="row">
                     <legend class="col-form-label col-sm-2 pt-0">Payment Method:</legend>
                     <div class="col-sm-10">

                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="paymentMethod" id="cash" value="cash" checked/>
                      <label class="form-check-label" for="cash">
                        {DataForm.paymentMethod?.toUpperCase()}
                      </label>
                    </div>
                    </div>
                    </div>
                    </fieldset>
                    <div id='final_price' style={{flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <label style={{fontSize: '30px'}}>{DataForm.totalPrice} <span style={{fontSize: '15px'}}>AED</span></label>
                    </div>
                </div>
                <div id='final_price' style={{flex: '1', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                      <label style={{fontSize: '15px'}}>Status: <span style={{fontSize: '30px', color: 'green'}}>{DataForm.orderStatus}</span></label>
                    </div>
          </div>
          <a onClick={()=> props.onHide()} class="btn btn-link btn-block">Close</a>

          </div>
        </Modal.Body>
      </Modal>
      
    );
  }
  export default OrderDisplayModal;