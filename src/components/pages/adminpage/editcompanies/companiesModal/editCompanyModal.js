import React, {useState, useEffect} from 'react'
import './editCompanyModal.css'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import FileBase from 'react-file-base64'
import LoadingModal from '../../../mainModals/loadingModal'
import DoneModal from '../../../mainModals/doneModal'
import { updateCompany, deleteCompany } from '../../../../../actions/companies'
import { useSelector } from 'react-redux'


function EditCompanyModal(props) {
  const offers = useSelector((state) => state.offers);
  const offersIn = offers.filter(item=> item.company==props.company_data.name)

  const products = useSelector((state) => state.products);
  const productsIn = products.filter(item=> item.company==props.company_data.name)

  const [DataForm, SetDataForm] = useState({
    name: props.company_data.name,
    email: props.company_data.email,
    address: props.company_data.address,
    logo: props.company_data.logo,
    phone: props.company_data.phone,
    cashFromSelling: props.company_data.cashFromSelling,
    numberOfSelledProducts: props.company_data.numberOfSelledProducts,
    products: props.company_data.products,
    offers: props.company_data.offers
  })

  useEffect(() => {
    SetDataForm({
      name: props.company_data.name,
      email: props.company_data.email,
      address: props.company_data.address,
      logo: props.company_data.logo,
      phone: props.company_data.phone,
      cashFromSelling: props.company_data.cashFromSelling,
      numberOfSelledProducts: props.company_data.numberOfSelledProducts,
      products: props.company_data.products,
      offers: props.company_data.offers
  });

}, [props.company_data])

  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [display, setDisplay] = useState(0)

  const handleChange = (e) => {
    SetDataForm({...DataForm, [e.target.name]: e.target.value});
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      setLoadingModalShow(true);
      dispatch(updateCompany(props.company_data._id, DataForm, setDoneModal, setLoadingModalShow, history));
}
const handleDelete = () => {
      setLoadingModalShow(true);
      dispatch(deleteCompany(props.company_data._id, offersIn, productsIn, setLoadingModalShow, history, props.onHide));
}
    return (
      <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
          <div id='editing_company'>
          <img src={props.company_data.logo} className='img_editing_modal' alt='user_profile'/>
            {display==0?
            <div id='user_info'>
            <label className='form_label'>{props.company_data.name}</label>
            <label className='form_label'>{props.company_data.email}</label>
            <label className='form_label'>{props.company_data.address}</label>
            <label className='form_label'>{props.company_data.phone}</label>
            <label className='form_label'>Owned Cash From Selling: <span style={{color: 'green', fontWeight: 'bold'}}>{props.company_data.cashFromSelling}</span></label>
            <label className='form_label'>Number Of Selled Products: <span style={{color: 'green', fontWeight: 'bold'}}>{props.company_data.numberOfSelledProducts}</span></label>
            <label className='form_label'>Offers Introduced: <span style={{color: 'green', fontWeight: 'bold'}}>{props.company_data.offers}</span></label>
            <label className='form_label'>Products Introduced: <span style={{color: 'green', fontWeight: 'bold'}}>{props.company_data.products}</span></label>
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <button onClick={handleDelete} className='btn btn-block btn-danger'>Delete</button>
            <button onClick={()=> setDisplay(1)} className='btn btn-block btn-dark'>Edit</button>
            </div>
            <a onClick={()=> props.onHide()} class="btn btn-link btn-block">Close</a>
            </div> :
            <form id='signup' onSubmit={handleSubmit}>
            <div class="form-group">
              <label className='form_label' for="name">Name:</label>
              <input type="text" name='name' class="form-control" id="name" value={DataForm.name} placeholder={props.company_data.name} onChange={handleChange} disabled/>
            </div>
            <div class="form-group">
              <label className='form_label' for="email">Email address:</label>
              <input type="email" name='email' class="form-control" id="email" value={DataForm.email} placeholder={props.company_data.email} onChange={handleChange} required/>
            </div>
            <div class="form-group">
              <label className='form_label' for="address">Address:</label>
              <textarea name='address' class="form-control" id="address" value={DataForm.address} placeholder={props.company_data.address} onChange={handleChange} rows="3" required></textarea>
            </div>
            <div class="form-group">
              <label className='form_label' for="phone">Phone:</label>
              <input type="text" className="form-control" id="phone" name="phone" value={DataForm.phone} placeholder={props.company_data.phone} onChange={handleChange} required/>
            </div>
            <div class="form-group">
              <label className='form_label' for="logo">Upload Logo:</label>
              <br/>
              <FileBase type='file' class="form-control-file" id="logo" name="logo" onDone={({base64}) => SetDataForm({...DataForm, logo: base64})} multiple={false} required></FileBase>
            </div>
            <button type="submit" class="btn btn-dark btn-block">Submit</button>
            <a onClick={()=> setDisplay(0)} style={{alignSelf:'center'}} className="btn btn-link btn-block">Back</a>
          </form> }
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
  export default EditCompanyModal;