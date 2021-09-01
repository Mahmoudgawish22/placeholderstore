import React, {useState, useEffect} from 'react'
import '../addoffer/addOffer.css'
import LoadingModal from '../../mainModals/loadingModal'
import DoneModal from '../../mainModals/doneModal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createOffer } from '../../../../actions/offers'


const AddOffer = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const companies = useSelector((state) => state.companies);
  const products = useSelector((state) => state.products);
  const types = useSelector((state) => state.types);
  const [DataForm, SetDataForm] = useState({
    promoCode: ' ',
    saleOff: 0,
    company: 'all',
    for: 'all',
    mainType: 'all',
  })

  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const clear = ()=> SetDataForm({ promoCode: ' ', saleOff: 0, company: 'all', for: 'all', mainType: 'all'});

  const handleChange = (e) => {
    SetDataForm({...DataForm, [e.target.name]: e.target.value});
  }
  const handleSubmit = (e) => {
      e.preventDefault()
      setLoadingModalShow(true)
      const selectedCompany = companies.filter(item=> item.name==DataForm.company);

      const productsFilteeredByGender = products.filter(item=> item.for==DataForm.for);
      const productsFilteredByMainType = productsFilteeredByGender.filter(item=> item.mainType==DataForm.mainType);
      const productsFinal = productsFilteredByMainType.filter(item=> item.company==DataForm.company)
      dispatch(createOffer(DataForm, selectedCompany[0], productsFinal, setDoneModal, setLoadingModalShow, history));
}
if (user?.result?.name && user?.result.userStatus=='admin') {
    return (
        <div id='add_offer'>
            <h1>Adding Offer</h1>
            <form id='signup' onSubmit={handleSubmit}>
                <div class="form-group">
                  <label className='form_label' for="promoCode">Promo Code:</label>
                  <input type="text" name='promoCode' class="form-control" value={DataForm.promoCode} onChange={handleChange} id="promoCode" placeholder="Enter Pomo Code" required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="saleOff">Sale Off: (%)</label>
                  <input type="number" name='saleOff' class="form-control" value={DataForm.saleOff} onChange={handleChange} id="saleOff" placeholder="Enter The Number of Percentage" required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="company">Company:</label>
                  <select id="company" name="company" value={DataForm.company} onChange={handleChange} className="form-control">
                     {companies.map(item=> 
                      <option key={item._id} value={item.name}>{item.name}</option>
                      )}
                      <option value='all'>All</option>
                   </select>
                </div>
                <div class="form-group">
                  <label className='form_label' for="for">For:</label>
                  <select id="product_for" name="for" value={DataForm.for} onChange={handleChange} className="form-control">
                     <option value="man">Man</option>
                     <option value="women">Woman</option>
                     <option value="kid">Kid</option>
                     <option value="all">All</option>
                   </select>
                </div>
                <div class="form-group">
                  <label className='form_label' for="mainType">Main Type:</label>
                  <select id="mainType" name="mainType" value={DataForm.mainType} onChange={handleChange} className="form-control">
                      <option value="all">All</option>
                     {types.map(item=> 
                      <option key={item._id} value={item.name}>{item.name}</option>
                      )}
                   </select>
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

export default AddOffer
