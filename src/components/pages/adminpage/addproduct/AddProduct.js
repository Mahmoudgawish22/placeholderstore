import React, {useState} from 'react'
import '../addproduct/addProduct.css'
import FileBase from 'react-file-base64'
import { useSelector } from 'react-redux'
import LoadingModal from '../../mainModals/loadingModal'
import DoneModal from '../../mainModals/doneModal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createProduct } from '../../../../actions/products'



const AddProduct = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const companies = useSelector((state) => state.companies);
  const types = useSelector((state) => state.types);

  const offers = useSelector((state) => state.offers);
  

  const [DataForm, SetDataForm] = useState({
    name: " ",
    realPrice: 0,
    afterPrice: 0,
    quantity: 0,
    colors: [],
    size: [],
    for: 'male',
    mainType: ' ',
    company: ' ',
    discribtion: ' ',
    photo: ' ',
    rating: [],
    liked: 0,
    ordered: 0,
    offersIn: []
  })
  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const clear = ()=> SetDataForm({ name: " ",
  realPrice: 0,
  afterPrice: 0,
  quantity: 0,
  colors: [],
  size: [],
  for: 'male',
  mainType: ' ',
  company: ' ',
  discribtion: ' ',
  photo: ' ',
  rating: [],
  liked: 0,
  ordered: 0,
  offersIn: []});

  const handleChange = (e) => {
    SetDataForm({...DataForm, [e.target.name]: e.target.value});
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      setLoadingModalShow(true);
      const colorArray = DataForm.colors.split(',');
      const sizeArray = DataForm.size.split(',');
      const selectedCompany = companies.filter(item=> item.name==DataForm.company);
      let offersFinal = []
      if (offers.length>0){ 
        const offersFilterByGender = offers.filter(item=> item.for==DataForm.for);
        const offersFilterByMainType = offersFilterByGender.filter(item=> item.mainType==DataForm.mainType);
        offersFinal = offersFilterByMainType.filter(item=> item.company==DataForm.company).map(item=> item.saleOff);
      }
      dispatch(createProduct({
        name: DataForm.name,
        realPrice: DataForm.realPrice,
        afterPrice: DataForm.afterPrice,
        quantity: DataForm.quantity,
        colors: colorArray,
        size: sizeArray,
        for: DataForm.for,
        mainType: DataForm.mainType,
        company: DataForm.company,
        discribtion: DataForm.discribtion,
        photo: DataForm.photo,
        rating: DataForm.rating,
        liked: DataForm.liked,
        ordered: DataForm.ordered,
        offersIn: offersFinal
      },selectedCompany[0], setDoneModal, setLoadingModalShow, history));
}
if (user?.result?.name && user?.result.userStatus=='admin') {
    return (
        <div id='add_product'>
            <h1>Adding Product</h1>
            <form id='signup' onSubmit={handleSubmit}>
                <div class="form-group">
                  <label className='form_label' for="name">Product Name:</label>
                  <input type="text" name='name' class="form-control" id="name" value={DataForm.name} onChange={handleChange} placeholder="Enter Product Name" required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="realPrice">Company Price:</label>
                  <input type="number" name='realPrice' class="form-control" id="realPrice" value={DataForm.realPrice} onChange={handleChange} placeholder="Enter The Company Price" required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="afterPrice">Price After Our Service:</label>
                  <input type="number" name='afterPrice' class="form-control" id="afterPrice" value={DataForm.afterPrice} onChange={handleChange} placeholder="Enter Price After Our Service" required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="quantity">Quantity:</label>
                  <input type="number" name='quantity' class="form-control" id="quantity" value={DataForm.quantity} onChange={handleChange} placeholder="Enter The Quantity" required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="colors">Colors:</label>
                  <input type="text" name='colors' class="form-control" id="colors" value={DataForm.colors} onChange={handleChange} placeholder="Enter Colors Seperated By ," required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="size">Sizes:</label>
                  <input type="text" name='size' class="form-control" id="size" value={DataForm.size} onChange={handleChange} placeholder="Enter Sizes Seperated By ," required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="for">For:</label>
                  <select id="for" name="for" className="form-control" value={DataForm.for} onChange={handleChange}>
                  <option value="none">Please Choose..</option>
                     <option value="man">Man</option>
                     <option value="women">Woman</option>
                     <option value="kid">Kid</option>
                     <option value="all">All</option>
                   </select>
                </div>
                <div class="form-group">
                  <label className='form_label' for="mainType">Main Type:</label>
                  <select id="mainType" name="mainType" className="form-control" value={DataForm.mainType} onChange={handleChange}>
                  <option value='none'>Please Choose..</option>
                  {types.map(item=> 
                      <option key={item._id} value={item.name}>{item.name}</option>
                      )}
                   </select>
                </div>
                <div class="form-group">
                  <label className='form_label' for="company">Company:</label>
                  <select id="company" name="company" className="form-control" value={DataForm.company} onChange={handleChange}>
                  <option value='none'>Please Choose..</option>
                  {companies.map(item=> 
                      <option key={item._id} value={item.name}>{item.name}</option>
                      )}
                   </select>
                </div>
                <div class="form-group">
                  <label className='form_label' for="discribtion">Describtion:</label>
                  <textarea name='discribtion' class="form-control" id="discribtion" value={DataForm.discribtion} onChange={handleChange} rows="3" required></textarea>
                </div>
                <div class="form-group">
                  <label className='form_label' for="photo">Upload Product Images:</label>
                  <br/>
                  <FileBase type='file' class="form-control-file" id="photo" name="photo" onDone={({base64}) => SetDataForm({...DataForm, photo: base64})} multiple={false} required></FileBase>
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

export default AddProduct
