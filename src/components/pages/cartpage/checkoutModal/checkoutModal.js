import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoadingModal from '../../mainModals/loadingModal'
import DoneModal from '../../mainModals/doneModal'
import { useSelector } from 'react-redux'
import './checkoutModal.css'
import ProductCom from './productComp'
import { createOrder } from '../../../../actions/orders'



function CheckOutModal(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [DataForm, SetDataForm] = useState({
    user: user.result._id,
    paymentMethod: 'cash',
    products: [],
    totalPrice: 0,
  })
  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [display, setDisplay] = useState(0)

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setLoadingModalShow(true);
    dispatch(createOrder(DataForm, setDoneModal, setLoadingModalShow, history));
    props.order_data.orderedFunc(true);
  }

  return (
      <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      onExit={()=>
        SetDataForm({
        user: user.result._id,
        paymentMethod: 'cash',
        products: [],
        totalPrice: 0,
      })}
      >
        <Modal.Body>
          <div id='editing_company' style={{padding: '20px'}}>
              {props.order_data.products?.map(item=> 
                <ProductCom id={item._id} originalPrice={item.offersIn.length>0?  item.afterPrice - (item.afterPrice * (item.offersIn[0] / 100)):item.afterPrice} key={item._id}
                 photo={item.photo} quantity={item.quantity} colors={item.colors} size={item.size}
                  allproducts= {props.order_data.products} dataFrom={DataForm} setDataForm={SetDataForm}/>
                )}
                <hr/>
                <div id='final_details'>
                  <div id='user_final_details'>
                    <img style={{height: '50px', width: '50px', borderRadius: '50%'}} src={user.result.photo}/>
                    |
                    <label>{user.result.country}</label>
                    |
                    <label>{user.result.address}</label>
                    |
                    <label>{user.result.phone}</label>
                    | 
                    <label>Approximately Deliver between 5-12 Days.</label>
                  </div>
                  <div id='payment_method'>
                  <fieldset class="form-group" style={{flex: '2'}}>
                    <div class="row">
                     <legend class="col-form-label col-sm-2 pt-0">Payment Method:</legend>
                     <div class="col-sm-10">

                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="paymentMethod" id="cash" value="cash" checked/>
                      <label class="form-check-label" for="cash">
                        Cash
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="paymentMethod" id="master-card" value="master-card" disabled/>
                      <label class="form-check-label" for="master-card">
                        Master Card
                      </label>
                    </div>
                    <div class="form-check disabled">
                      <input class="form-check-input" type="radio" name="paymentMethod" id="visa-card" value="visa-card" disabled/>
                      <label class="form-check-label" for="visa-card">
                        Visa Card
                      </label>
                    </div>
                    </div>
                    </div>
                    </fieldset>
                    <div id='final_price' style={{flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <label style={{fontSize: '30px'}}>{DataForm.totalPrice} <span style={{fontSize: '15px'}}>AED</span></label>
                    </div>
                </div>
          </div>
          <button type="button" style={{width: '100%'}} onClick={handleOrderSubmit} class="btn btn-dark btn-block">Make Order!</button>
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
  export default CheckOutModal;