import React, {useState} from 'react'
import '../addcompany/addCompany.css'
import FileBase from 'react-file-base64'
import LoadingModal from '../../mainModals/loadingModal'
import DoneModal from '../../mainModals/doneModal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createCompany } from '../../../../actions/companies'



const AddCompany = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [DataForm, SetDataForm] = useState({
    name: ' ',
    email: ' ',
    address: ' ',
    logo: ' ',
    phone: ' ',
    cashFromSelling: 0,
    numberOfSelledProducts: 0,
    products: 0,
    offers: 0
  })
  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const clear = ()=> SetDataForm({ name: '', email: '', address: '', logo: '', phone: '' });

  const handleChange = (e) => {
    SetDataForm({...DataForm, [e.target.name]: e.target.value});
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      setLoadingModalShow(true);
      dispatch(createCompany(DataForm, setDoneModal, setLoadingModalShow, history));
}
if (user?.result?.name && user?.result.userStatus=='admin') {
    return (
        <div id='add_company'>
            <h1>Adding Company</h1>
            <form id='signup' onSubmit={handleSubmit}>
                <div class="form-group">
                  <label className='form_label' for="name">Name:</label>
                  <input type="text" name='name' class="form-control" id="name" value={DataForm.name} onChange={handleChange} placeholder="Enter Company Name" required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="email">Email address:</label>
                  <input type="email" name='email' class="form-control" id="email" value={DataForm.email} onChange={handleChange} aria-describedby="emailHelp" placeholder="Enter email" required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="address">Address:</label>
                  <textarea name='address' class="form-control" id="address" value={DataForm.address} onChange={handleChange} rows="3" required></textarea>
                </div>
                <div class="form-group">
                  <label className='form_label' for="phone">Phone:</label>
                  <input type="text" className="form-control" id="phone" name="phone" value={DataForm.phone} onChange={handleChange} placeholder="Enter your phone number" required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="logo">Upload Logo:</label>
                  <br/>
                  <FileBase type='file' class="form-control-file" id="logo" name="logo" onDone={({base64}) => SetDataForm({...DataForm, logo: base64})} multiple={false} required></FileBase>
                </div>
                <button type="submit" class="btn btn-dark btn-block">Submit</button>
              </form>
              <DoneModal
                 show={doneModal}
                 textStatus= 'Done!'
                 onHide={() => setDoneModal(false)}
                 onExit={() => {clear(); window.location.reload()}}
              />
              <LoadingModal
                show={loadingModalShow}
                backdrop="static"
              />
        </div>
    )
  } else {
    window.location.replace("/");
}
}

export default AddCompany
