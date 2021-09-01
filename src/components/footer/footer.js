import React, { useState } from 'react'
import '../footer/footer.css'
import siteLogo from '../../img/shopping-cart.svg'
import LoadingModal from '../pages/mainModals/loadingModal'
import DoneModal from '../pages/mainModals/doneModal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createNews } from '../../actions/news'

function Footer(props) {
    const [DataForm, SetDataForm] = useState({
        email: ' ',
      })
      const [loadingModalShow, setLoadingModalShow] = useState(false);
      const [doneModal, setDoneModal] = useState(false);
      const dispatch = useDispatch();
      const history = useHistory();
      const clear = ()=> SetDataForm({ email: ' '});
      const handleChange = (e) => {
        SetDataForm({...DataForm, [e.target.name]: e.target.value});
      }
      const handleSubmit = (e) => {
          e.preventDefault();
          setLoadingModalShow(true);
          dispatch(createNews(DataForm, setDoneModal, setLoadingModalShow, history));
    }
    return (
        <div id='footer'>
            <div id='upper_footer'>
                <div id='go_to_top'>
                    <a href='#big__header' className='go-to-to'><i class="fas fa-arrow-circle-up"></i></a>
                </div>
                <div id='logo_subscribNews'>
                <form style={{display: 'flex'}} onSubmit={handleSubmit}>
                <div class="form-group">
                  <input style={{borderRadius: '0', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'}} 
                  type="email" name='email' value={DataForm.email} onChange={handleChange} class="form-control" id="email" aria-describedby="emailHelp" placeholder="I Want To Recieve Emails" required/>
                </div>
                <button style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}}
                 type="submit" className="btn btn-danger">Submit</button>
              </form>
              <div id='header__realone__logo'>
                    <img src={siteLogo} alt='site_logo' className='site_logo'/>
                    <label className='logo_text' style={{color: 'white'}}>Placeholder</label>
                </div>
                </div>
                <div id='social_media'>
                <a href='#' className='go-to-to'><i class="fab fa-facebook"></i></a>
                <a href='#' className='go-to-to'><i class="fab fa-twitter"></i></a>
                <a href='#' className='go-to-to'><i class="fab fa-instagram"></i></a>
                <a href='#' className='go-to-to'><i class="fab fa-linkedin-in"></i></a>
                <a href='#' className='go-to-to'><i class="fab fa-google"></i></a>
                </div>
            </div>
            <div className='footercontent'>
                  <hr style={{width: '30%', color: 'white'}}/>
                  <p className='icondiscrbfooter'>
                      One Of Mahmoud Gawish's Projects.
                      <br/>
                      The entire website was designed using MERN Stack.
                      <br/>
                      <br/>
                      How do you drink your Coffee?
                      <br/>
                      (+971) 507327385
                      <br/>
                      <br/>
                      <span style={{color: 'white'}}> © 2021 ALL RIGHT RESEVED </span>
                  </p>
                  </div>
                  <DoneModal
                     show={doneModal}
                     textStatus= 'Done!'
                     onHide={() => setDoneModal(false)}
                     onExit={clear}
                  />
                  <LoadingModal
                    show={loadingModalShow}
                    backdrop="static"
                  />
        </div>
    )
}
export default Footer