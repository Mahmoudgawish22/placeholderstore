import React, {useState} from 'react'
import '../addtype/addType.css'
import FileBase from 'react-file-base64'
import LoadingModal from '../../mainModals/loadingModal'
import DoneModal from '../../mainModals/doneModal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createType } from '../../../../actions/types'


const AddType = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [DataForm, SetDataForm] = useState({
    name: ' ',
    photo: ' ',
  })
  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const clear = ()=> SetDataForm({ name: ' ', photo: ' '});

  const handleChange = (e) => {
    SetDataForm({...DataForm, [e.target.name]: e.target.value});
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      setLoadingModalShow(true);
      dispatch(createType(DataForm, setDoneModal, setLoadingModalShow, history));
}
if (user?.result?.name && user?.result.userStatus=='admin') {
    return (
        <div id='add_type'>
             <h1>Adding Type</h1>
            <form id='signup' onSubmit={handleSubmit}>
                <div class="form-group">
                  <label className='form_label' for="name">Type Name:</label>
                  <input type="text" name='name' class="form-control" value={DataForm.name} onChange={handleChange} id="name" placeholder="Enter Type Name" required/>
                </div>
                <div class="form-group">
                  <label className='form_label' for="photo">Upload Type Image:</label>
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

export default AddType
