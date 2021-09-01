import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import LoadingModal from '../../../mainModals/loadingModal'
import DoneModal from '../../../mainModals/doneModal'
import OrderDisplayCom from '../../../orderspage/OrderDisplayForUser/orederDisplayCom'
import { deleteReturn, updateReturn } from '../../../../../actions/returns'
import { deleteOrderFromReturn } from '../../../../../actions/orders'



function ReturnModalMang(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userWeNeed = useSelector((state)=> state.users).filter(item=> item._id==props.return_data.user);
  const orderWeNeed = useSelector((state)=> state.orders).filter(item=> item._id==props.return_data.orderId);
  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [DataForm, SetDataForm] = useState({
    user: props.return_data.user,
    products: props.return_data.products,
    reason: props.return_data.reason,
  })
  useEffect(() => {
    SetDataForm({
        user: props.return_data.user,
        products: props.return_data.products,
        reason: props.return_data.reason,
  });
}, [props.return_data])

const handleConfirmOrder = (id) => {
    setLoadingModalShow(true);
    dispatch(deleteOrderFromReturn(props.return_data.orderId, history));
    dispatch(deleteReturn(id, setDoneModal, setLoadingModalShow, history));
    
}
const handleCancelOrder = (id) => {
    setLoadingModalShow(true);
    dispatch(deleteReturn(id, setDoneModal, setLoadingModalShow, history));
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
              {orderWeNeed[0]?.products?.map(item=> 

                <OrderDisplayCom productID={item.productId} key={item._id}
                  quantity={item.quantity} color={item.color} size={item.size}/>
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
                    <label> Order Date: {orderWeNeed[0]?.reqDate}</label>
                    | 
                    <label> Delivered In: {orderWeNeed[0]?.delDate}</label>
                  </div>
                  <div id='payment_method' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                 <p>The User With Name <span style={{color: 'darkred', fontWeight: 'bold'}}>{userWeNeed[0]?.name}</span> Needs To Return The Order With Price: <span style={{color: 'darkred', fontWeight: 'bold'}}>{orderWeNeed[0]?.totalPrice}</span>, And The Reason Is <span style={{color: 'darkred', fontWeight: 'bold'}}>{DataForm.reason}</span></p>
                 <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                     <button onClick={()=> handleCancelOrder(props.return_data._id)} className= 'btn btn-block btn-danger btn-sm'>Refuced</button>
                     <button onClick={()=> handleConfirmOrder(props.return_data._id)} className= 'btn btn-block btn-dark btn-sm'>Returned <i class="fas fa-check"></i></button>
                </div>
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
  export default ReturnModalMang;