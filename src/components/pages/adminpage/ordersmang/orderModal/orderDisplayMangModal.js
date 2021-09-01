import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoadingModal from '../../../mainModals/loadingModal'
import DoneModal from '../../../mainModals/doneModal'
import { useSelector } from 'react-redux'
import { updateOrder, deleteOrder } from '../../../../../actions/orders'
import OrderDisplayCom from '../../../orderspage/OrderDisplayForUser/orederDisplayCom'



function OrderDisplayMangModal(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userWeNeed = useSelector((state)=> state.users).filter(item=> item._id==props.order_data.user);
  const dispatch = useDispatch()
  const history = useHistory()
  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
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

const handleCancelOrder = (id) => {
    setLoadingModalShow(true);
    dispatch(deleteOrder(props.order_data._id, setDoneModal, setLoadingModalShow, history));
}
const handleConfirmOrder = (id) => {
    setLoadingModalShow(true);
    if (props.order_data.orderStatus=='TBC') {
        dispatch(updateOrder(props.order_data._id, {...props.order_data, orderStatus: 'LFR'}, setDoneModal, setLoadingModalShow, history));
    } else if (props.order_data.orderStatus=='LFR') {
        dispatch(updateOrder(props.order_data._id, {...props.order_data, orderStatus: 'OTW', delDate:new Date().toDateString()}, setDoneModal, setLoadingModalShow, history));
    } else {
        dispatch(updateOrder(props.order_data._id, {...props.order_data, orderStatus: 'Done'}, setDoneModal, setLoadingModalShow, history));

    }
}
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
                  quantity={item.quantity} color={item.color} size={item.size} orderStatus= {DataForm.orderStatus}/>
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
                <br/>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {props.order_data.orderStatus=='TBC'?
                     <button onClick={()=> handleCancelOrder(props.order_data._id)} className= 'btn btn-block btn-danger btn-sm'>Cancel</button>
                     : <span></span>
                    }
                    <button onClick={()=> handleConfirmOrder(props.order_data._id)} className= 'btn btn-block btn-dark btn-sm'>Confirm</button>
                </div>
          </div>
          <a onClick={()=> props.onHide()} class="btn btn-link btn-block">Close</a>

          </div>
        </Modal.Body>
        <DoneModal
                 show={doneModal}
                 textStatus= 'Done!'
                 onHide={() => setDoneModal(false)}
                 onExit={()=> {props.onHide()}}
              />
              <LoadingModal
                show={loadingModalShow}
                backdrop="static"
              />
      </Modal>
      
    );
  }
  export default OrderDisplayMangModal;