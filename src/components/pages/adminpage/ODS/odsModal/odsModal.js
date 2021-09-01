import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import FileBase from 'react-file-base64'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoadingModal from '../../../mainModals/loadingModal'
import DoneModal from '../../../mainModals/doneModal'
import { updateOffersImg } from '../../../../../actions/offersImg'


function ODSModal(props) {
  const [DataForm, SetDataForm] = useState({
    photo: props.offerImg_data.photo,
  })

  useEffect(() => {
    SetDataForm({
      photo: props.offerImg_data.photo,
  });

}, [props.offerImg_data])

  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
      e.preventDefault();
      setLoadingModalShow(true);
      dispatch(updateOffersImg(props.offerImg_data._id, DataForm, setDoneModal, setLoadingModalShow, history));
}

    return (
      <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
          <div id='editing_company'>
          <img src={props.offerImg_data.photo} className='type_img_display' alt='user_profile'/>
            <form id='signup' onSubmit={handleSubmit} style={{alignItems: 'center'}}>
                <div class="form-group">
                  <label className='form_label' for="photo">Upload Type Image:</label>
                  <br/>
                  <FileBase type='file' class="form-control-file" id="photo" name="photo" onDone={({base64}) => SetDataForm({...DataForm, photo: base64})} multiple={false} required></FileBase>
                </div>
                <button type="submit" class="btn btn-dark btn-block">Submit</button>
                <a onClick={()=> props.onHide()} class="btn btn-link btn-block">Close</a>
            </form>
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
  export default ODSModal;