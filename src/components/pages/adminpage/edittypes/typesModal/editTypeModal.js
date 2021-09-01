import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import FileBase from 'react-file-base64'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoadingModal from '../../../mainModals/loadingModal'
import DoneModal from '../../../mainModals/doneModal'
import { updateType, deleteType } from '../../../../../actions/types'
import { useSelector } from 'react-redux'



function EditTypeModal(props) {
  const products = useSelector((state)=> state.products);
  const offers = useSelector((state)=> state.offers);

  const [DataForm, SetDataForm] = useState({
    name: props.type_data.name,
    photo: props.type_data.photo,
  })

  useEffect(() => {
    SetDataForm({
      name: props.type_data.name,
      photo: props.type_data.photo,
  });

}, [props.type_data])

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
      dispatch(updateType(props.type_data._id, DataForm, setDoneModal, setLoadingModalShow, history));
}
const handleDelete = () => {
      setLoadingModalShow(true);
      const productsIn = products.filter(item=> item.mainType==DataForm.name);
      const offersIn = offers.filter(item=> item.mainType==DataForm.name);
      dispatch(deleteType(props.type_data._id, productsIn, offersIn, setLoadingModalShow, history, props.onHide));
}
    return (
      <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
          <div id='editing_company'>
          <img src={props.type_data.photo} className='type_img_display' alt='user_profile'/>
            {display==0?
            <div id='user_info'>
            <label className='form_label'>{props.type_data.name} </label>
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
               <button onClick={handleDelete} className='btn btn-block btn-danger'>Delete</button>
               <button onClick={()=> setDisplay(1)} className='btn btn-block btn-dark'>Edit</button>
            </div>
            <a onClick={()=> props.onHide()} class="btn btn-link btn-block">Close</a>
            </div> :
            <form id='signup' onSubmit={handleSubmit}>
            <div class="form-group">
                  <label className='form_label' for="name">Type Name:</label>
                  <input type="text" name='name' class="form-control" value={DataForm.name} onChange={handleChange} id="name" placeholder="Enter Type Name" disabled/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="photo">Upload Type Image:</label>
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
  export default EditTypeModal;