import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createReturn } from '../../../../actions/returns'
import LoadingModal from '../../mainModals/loadingModal'
import DoneModal from '../../mainModals/doneModal'
import OrderDisplayCom from './orederDisplayCom'



function ReturnModal(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userWeNeed = useSelector((state)=> state.users).filter(item=> item._id==props.return_data.user);
  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [DataForm, SetDataForm] = useState({
    user: props.return_data.user,
    products: props.return_data.products,
    reason: '',
    orderId: props.return_data._id
  })
  useEffect(() => {
    SetDataForm({
        user: props.return_data.user,
        products: props.return_data.products,
        reason: '',
        orderId: props.return_data._id
  });
}, [props.return_data])

const handleReturnReq = (e) => {
    e.preventDefault();
    setLoadingModalShow(true);
    dispatch(createReturn(DataForm, setDoneModal, setLoadingModalShow, history));
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
                    <img style={{height: '50px', width: '50px', borderRadius: '50%'}} src={user.result.photo}/>
                    |
                    <label>{userWeNeed[0]?.country}</label>
                    |
                    <label>{userWeNeed[0]?.address}</label>
                    |
                    <label>{userWeNeed[0]?.phone}</label>
                    |
                    <label> Order Date: {props.return_data.reqDate}</label>
                    | 
                    <label> Delivered In: {props.return_data.delDate}</label>
                  </div>
                  <div id='payment_method'>
                  <form id='signup' onSubmit={handleReturnReq}>
                    <div class="form-group">
                      <label className='form_label' for="reason">Reason:</label>
                      <textarea name='reason' value={DataForm.reason} onChange={(e)=> SetDataForm({...DataForm, reason: e.target.value })} class="form-control" id="reason" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-dark btn-block">Submit</button>
                  </form>
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
  export default ReturnModal;