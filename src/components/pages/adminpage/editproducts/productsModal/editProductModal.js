import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoadingModal from '../../../mainModals/loadingModal'
import DoneModal from '../../../mainModals/doneModal'
import { updateProduct, deleteProduct } from '../../../../../actions/products'
import FileBase from 'react-file-base64'
import { useSelector } from 'react-redux'


function EditProductModal(props) {
  const companies = useSelector((state) => state.companies);
  const types = useSelector((state) => state.types);

  const offers = useSelector((state) => state.offers);
  const offersFilterByGender = offers.filter(item=> item.for==props.product_data.for);
  const offersFilterByMainType = offersFilterByGender.filter(item=> item.mainType==props.product_data.mainType);
  const offersFinal = offersFilterByMainType.filter(item=> item.company==props.product_data.company)

  const ratingsArr = props.product_data.rating?.map(item=> item.rating);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const rating = ratingsArr?.reduce(reducer, 0);
  const finalRating = rating/ratingsArr?.length;

  const [DataForm, SetDataForm] = useState({
    name: props.product_data.name,
    realPrice: props.product_data.realPrice,
    afterPrice: props.product_data.afterPrice,
    quantity: props.product_data.quantity,
    colors: props.product_data.colors?.join(','),
    size: props.product_data.size?.join(','),
    for: props.product_data.for,
    mainType: props.product_data.mainType,
    company: props.product_data.company,
    discribtion: props.product_data.discribtion,
    photo: props.product_data.photo,
    rating: props.product_data.rating,
    liked: props.product_data.liked,
    ordered: props.product_data.ordered,
    offersIn: props.product_data.offersIn
  })

  useEffect(() => {
    SetDataForm({
    name: props.product_data.name,
    realPrice: props.product_data.realPrice,
    afterPrice: props.product_data.afterPrice,
    quantity: props.product_data.quantity,
    colors: props.product_data.colors?.join(','),
    size: props.product_data.size?.join(','),
    for: props.product_data.for,
    mainType: props.product_data.mainType,
    company: props.product_data.company,
    discribtion: props.product_data.discribtion,
    photo: props.product_data.photo,
    rating: props.product_data.rating,
    liked: props.product_data.liked,
    ordered: props.product_data.ordered,
    offersIn: props.product_data.offersIn
  });

}, [props.product_data])


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
      const colorArray = DataForm.colors.split(',');
      const sizeArray = DataForm.size.split(',');
      dispatch(updateProduct(props.product_data._id, {
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
        offersIn: DataForm.offersIn
      }, setDoneModal, setLoadingModalShow, history));
}
const handleDelete = () => {
      setLoadingModalShow(true);
      const companiesIn = companies.filter(item=> item.name==DataForm.company);
      dispatch(deleteProduct(props.product_data._id, companiesIn[0], setLoadingModalShow, history, props.onHide));
}
    return (
      <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
          <div id='editing_company'>
            <img src={props.product_data.photo} className='product_img_display' alt='user_profile'/>
            {display==0?
            <div id='user_info'>
            <label className='form_label'>{props.product_data.name} </label>
            <label className='form_label'>Real Price: <span style={{color: 'red', fontWeight: 'bold'}}>{props.product_data.realPrice} AED</span></label>
            <label className='form_label'>Total Price:  <span style={{color: 'green', fontWeight: 'bold'}}>{props.product_data.afterPrice}</span></label>
            <label className='form_label'>Quantity: <span style={{color: 'blue', fontWeight: 'bold'}}>{props.product_data.quantity}</span></label>
            <label className='form_label'>Colors: <span style={{fontWeight: 'bolder'}}>{props.product_data.colors?.join(',')}</span></label>
            <label className='form_label'>Sizes: <span style={{fontWeight: 'bolder'}}>{props.product_data.size?.join(',')}</span></label>
            <label className='form_label'>For Gender: <span style={{fontWeight: 'bolder'}}>{props.product_data.for}</span></label>
            <label className='form_label'>Type: <span style={{fontWeight: 'bolder'}}>{props.product_data.mainType}</span></label>
            <label className='form_label'>From Company: <span style={{color: 'blue', fontWeight: 'bolder'}}>{props.product_data.company}</span></label>
            <label className='form_label'>Discribtion: <span style={{fontWeight: 'bolder'}}>{props.product_data.discribtion}</span></label>
            <label className='form_label'>Rating: <span style={{color: 'yellow', fontWeight: 'bolder'}}>{finalRating}/5</span></label>
            <label className='form_label'>Liked From Users: <span style={{color: 'lightred', fontWeight: 'bolder'}}>{props.product_data.liked} Times</span></label>
            <label className='form_label'>Ordered From Users: <span style={{color: 'darkgreen', fontWeight: 'bolder'}}>{props.product_data.ordered} Times</span></label>
            <label className='form_label'>Offers In: <span style={{color: 'red', fontWeight: 'bolder'}}> {offersFinal.map(item=>'Sale Off ' + item.saleOff + '% From Offer #' + item.promoCode + ', ')}</span></label>

            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
               <button onClick={handleDelete} className='btn btn-block btn-danger'>Delete</button>
               <button onClick={()=> setDisplay(1)} className='btn btn-block btn-dark'>Edit</button>
            </div>
            <a onClick={()=> props.onHide()} class="btn btn-link btn-block">Close</a>
            </div> :
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
                  <select id="for" name="for" className="form-control" value={DataForm.for} onChange={handleChange} disabled>
                  <option value="none">Please Choose..</option>
                     <option value="man">Man</option>
                     <option value="women">Woman</option>
                     <option value="kid">Kid</option>
                     <option value="all">All</option>
                     
                   </select>
                </div>
                <div class="form-group">
                  <label className='form_label' for="mainType">Main Type:</label>
                  <select id="mainType" name="mainType" className="form-control" value={DataForm.mainType} onChange={handleChange} disabled>
                  <option value='none'>Please Choose..</option>
                  {types.map(item=> 
                      <option key={item._id} value={item.name}>{item.name}</option>
                      )}
                   </select>
                </div>
                <div class="form-group">
                  <label className='form_label' for="company">Company:</label>
                  <select id="company" name="company" className="form-control" value={DataForm.company} onChange={handleChange} disabled>
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
  export default EditProductModal;