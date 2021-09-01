import React, {useState, useEffect} from 'react'
import './editOfferModal.css'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoadingModal from '../../../mainModals/loadingModal'
import DoneModal from '../../../mainModals/doneModal'
import { updateOffer, deleteOffer } from '../../../../../actions/offers'
import { useSelector } from 'react-redux'


function EditOfferModal(props) {
  const companies = useSelector((state) => state.companies);
  const products = useSelector((state) => state.products);
  const [DataForm, SetDataForm] = useState({
    promoCode: props.offer_data.promoCode,
    saleOff: props.offer_data.saleOff,
    company: props.offer_data.company,
    for: props.offer_data.for,
    mainType: props.offer_data.mainType,
  })

  useEffect(() => {
    SetDataForm({
      promoCode: props.offer_data.promoCode,
    saleOff: props.offer_data.saleOff,
    company: props.offer_data.company,
    for: props.offer_data.for,
    mainType: props.offer_data.mainType,
  });

}, [props.offer_data])


  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

const handleDelete = () => {
      setLoadingModalShow(true);
      const regex = props.offer_data.saleOff;
      let productsIn = products.filter(item=> item.offersIn.find(iner=> iner==props.offer_data.saleOff))
      const companiesIn = companies.filter(item=> item.name==props.offer_data.company)
      dispatch(deleteOffer(props.offer_data._id, productsIn, companiesIn[0], regex, setLoadingModalShow, history, props.onHide));
}
    return (
      <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
          <div id='editing_company'>
            <div id='user_info'>
            <label className='form_label'>#{props.offer_data.promoCode} </label>
            <label className='form_label'>Sale OF: <span style={{color: 'red', fontWeight: 'bold'}}>{props.offer_data.saleOff}%</span></label>
            <label className='form_label'>For Company:  <span style={{color: 'green', fontWeight: 'bold'}}>{props.offer_data.company}</span></label>
            <label className='form_label'>For Gender: <span style={{color: 'blue', fontWeight: 'bold'}}>{props.offer_data.for}</span></label>
            <label className='form_label'>Products Type Of Sale: <span style={{color: 'red', fontWeight: 'bolder'}}>{props.offer_data.mainType}</span></label>
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
               <button onClick={handleDelete} className='btn btn-block btn-danger'>Delete</button>
            </div>
            <a onClick={()=> props.onHide()} class="btn btn-link btn-block">Close</a>
            </div> 
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
  export default EditOfferModal;