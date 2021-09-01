import React, {useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import FileBase from 'react-file-base64'
import LoadingModal from '../../../mainModals/loadingModal'
import DoneModal from '../../../mainModals/doneModal'
import { updateUser, deleteUser } from '../../../../../actions/users'


function EditUserModal(props) {
    const [signFormData, setSignFormData] = useState({
        firstName: props.user_data.name?.split(' ')[0],
        lastName: props.user_data.name?.split(' ')[1],
        password: ' ',
        Passwordrepeat: ' ',
        email: props.user_data.email,
        address: props.user_data.address,
        birthday: props.user_data.dateOfBirth,
        country: props.user_data.country,
        phone: props.user_data.phone,
        photo: props.user_data.photo,
        userStatus: props.user_data.userStatus,
        dateOfRigester: props.user_data.dateOfRigester,
        liked: props.user_data.liked,
        cart: props.user_data.cart,
        recentlyView: props.user_data.recentlyView,
        orders: props.user_data.orders,
      })

  useEffect(() => {
        setSignFormData({firstName: props.user_data.name?.split(' ')[0],
        lastName: props.user_data.name?.split(' ')[1],
        password: ' ',
        Passwordrepeat: ' ',
        email: props.user_data.email,
        address: props.user_data.address,
        birthday: props.user_data.dateOfBirth,
        country: props.user_data.country,
        phone: props.user_data.phone,
        photo: props.user_data.photo,
        userStatus: props.user_data.userStatus,
        dateOfRigester: props.user_data.dateOfRigester,
        liked: props.user_data.liked,
        cart: props.user_data.cart,
        recentlyView: props.user_data.recentlyView,
        orders: props.user_data.orders,
      });

    }, [props.user_data])
  const [loadingModalShow, setLoadingModalShow] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [display, setDisplay] = useState(0)
  const [errorLoginRespond, setErrorLoginRespond] = useState({
    message: 0
  })

  const handleSignUpChange = (e) => {
    setSignFormData({...signFormData, [e.target.name]: e.target.value});
  }
  const handleSignUpSubmit = (e) => {
      e.preventDefault();
      setLoadingModalShow(true);
      dispatch(updateUser(props.user_data._id, signFormData, setDoneModal, setLoadingModalShow, setErrorLoginRespond));
}
const handleDelete = () => {
      setLoadingModalShow(true);
      dispatch(deleteUser(props.user_data._id, setLoadingModalShow, history, props.onHide));
}
    return (
      <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
          <div id='editing_company'>
          <img src={props.user_data.photo} className='img_editing_modal' alt='user_profile'/>
            {display==0?
            <div id='user_info'>
            <label className='form_label'>{props.user_data.name}</label>
            <label className='form_label'>{props.user_data.email}</label>
            <label className='form_label'>{props.user_data.address}</label>
            <label className='form_label'>{props.user_data.phone}</label>
            <label className='form_label'>{props.user_data.userStatus}</label>
            <label className='form_label'>Date Of Birth: {props.user_data.dateOfBirth}</label>
            <label className='form_label'>Date Of Rigester: {props.user_data.dateOfRigester}</label>
            <label className='form_label'>From: {props.user_data.country}</label>
            <label className='form_label'>Orders: <span style={{color: 'green', fontWeight: 'bold'}}>{props.user_data.orders?.length}</span></label>
            <label className='form_label'>Products In Cart: <span style={{color: 'green', fontWeight: 'bold'}}>{props.user_data.cart?.length}</span></label>
            <label className='form_label'>Liked Products: <span style={{color: 'green', fontWeight: 'bold'}}>{props.user_data.liked?.length}</span></label>
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <button onClick={handleDelete} className='btn btn-block btn-danger'>Delete</button>
            <button onClick={()=> setDisplay(1)} className='btn btn-block btn-dark'>Edit</button>
            </div>
            <a onClick={()=> props.onHide()} class="btn btn-link btn-block">Close</a>
            </div> :
            <form id='signup' onSubmit={handleSignUpSubmit}>
            {errorLoginRespond.message==2?
        <label style={{color: 'red'}}>*It Seems We Have Error In Sign You Up, Please Try To Match The Two Passwors, Or Change Your Email.</label>
        :<span></span>
      }
          <div class="form-group">
            <label className='form_label' for="firstName">First Name</label>
            <input type="text" name='firstName' class="form-control" value={signFormData.firstName} onChange={handleSignUpChange} id="firstName" placeholder="Enter First Name" required/>
          </div>
          <div class="form-group">
            <label className='form_label' for="secondName">Last Name</label>
            <input type="text" name='lastName' value={signFormData.lastName} onChange={handleSignUpChange} class="form-control" id="secondName" placeholder="Enter last Name" required/>
          </div>
          <div class="form-group">
            <label className='form_label' for="Password">Password</label>
            <input type="password" name='password' value={signFormData.password} onChange={handleSignUpChange} class="form-control" id="Password" placeholder="Enter Password" required/>
          </div>
          <div class="form-group">
            <label className='form_label' for="Passwordrepeat">Re-Enter Password</label>
            <input type="password" name='Passwordrepeat' value={signFormData.Passwordrepeat} onChange={handleSignUpChange} class="form-control" id="Passwordrepeat" placeholder="Enter Password Again" required/>
          </div>
          <div class="form-group">
            <label className='form_label' for="email">Email address</label>
            <input type="email" name='email' value={signFormData.email} onChange={handleSignUpChange} class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required/>
          </div>
          <div class="form-group">
            <label className='form_label' for="address">Address</label>
            <textarea name='address' value={signFormData.address} onChange={handleSignUpChange} class="form-control" id="address" rows="3" required></textarea>
          </div>
          <div class="form-group">
            <label className='form_label' for="birthday">Birthday</label>
            <input type="date" value={signFormData.birthday} onChange={handleSignUpChange} className="form-control" id="birthday" name="birthday"/>
          </div>
          <div class="form-group">
            <label className='form_label' for="country">Country</label>
            <select id="country" name="country" value={signFormData.country} onChange={handleSignUpChange} className="form-control">
          <option value="Afghanistan">Afghanistan</option>
          <option value="Åland Islands">Åland Islands</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
          <option value="American Samoa">American Samoa</option>
          <option value="Andorra">Andorra</option>
          <option value="Angola">Angola</option>
          <option value="Anguilla">Anguilla</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Antigua and Barbuda">Antigua and Barbuda</option>
          <option value="Argentina">Argentina</option>
          <option value="Armenia">Armenia</option>
          <option value="Aruba">Aruba</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Barbados">Barbados</option>
          <option value="Belarus">Belarus</option>
          <option value="Belgium">Belgium</option>
          <option value="Belize">Belize</option>
          <option value="Benin">Benin</option>
          <option value="Bermuda">Bermuda</option>
          <option value="Bhutan">Bhutan</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
          <option value="Botswana">Botswana</option>
          <option value="Bouvet Island">Bouvet Island</option>
          <option value="Brazil">Brazil</option>
          <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
          <option value="Brunei Darussalam">Brunei Darussalam</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Burkina Faso">Burkina Faso</option>
          <option value="Burundi">Burundi</option>
          <option value="Cambodia">Cambodia</option>
          <option value="Cameroon">Cameroon</option>
          <option value="Canada">Canada</option>
          <option value="Cape Verde">Cape Verde</option>
          <option value="Cayman Islands">Cayman Islands</option>
          <option value="Central African Republic">Central African Republic</option>
          <option value="Chad">Chad</option>
          <option value="Chile">Chile</option>
          <option value="China">China</option>
          <option value="Christmas Island">Christmas Island</option>
          <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
          <option value="Colombia">Colombia</option>
          <option value="Comoros">Comoros</option>
          <option value="Congo">Congo</option>
          <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
          <option value="Cook Islands">Cook Islands</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Cote D'ivoire">Cote D'ivoire</option>
          <option value="Croatia">Croatia</option>
          <option value="Cuba">Cuba</option>
          <option value="Cyprus">Cyprus</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="Denmark">Denmark</option>
          <option value="Djibouti">Djibouti</option>
          <option value="Dominica">Dominica</option>
          <option value="Dominican Republic">Dominican Republic</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Egypt">Egypt</option>
          <option value="El Salvador">El Salvador</option>
          <option value="Equatorial Guinea">Equatorial Guinea</option>
          <option value="Eritrea">Eritrea</option>
          <option value="Estonia">Estonia</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
          <option value="Faroe Islands">Faroe Islands</option>
          <option value="Fiji">Fiji</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="French Guiana">French Guiana</option>
          <option value="French Polynesia">French Polynesia</option>
          <option value="French Southern Territories">French Southern Territories</option>
          <option value="Gabon">Gabon</option>
          <option value="Gambia">Gambia</option>
          <option value="Georgia">Georgia</option>
          <option value="Germany">Germany</option>
          <option value="Ghana">Ghana</option>
          <option value="Gibraltar">Gibraltar</option>
          <option value="Greece">Greece</option>
          <option value="Greenland">Greenland</option>
          <option value="Grenada">Grenada</option>
          <option value="Guadeloupe">Guadeloupe</option>
          <option value="Guam">Guam</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Guernsey">Guernsey</option>
          <option value="Guinea">Guinea</option>
          <option value="Guinea-bissau">Guinea-bissau</option>
          <option value="Guyana">Guyana</option>
          <option value="Haiti">Haiti</option>
          <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
          <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
          <option value="Honduras">Honduras</option>
          <option value="Hong Kong">Hong Kong</option>
          <option value="Hungary">Hungary</option>
          <option value="Iceland">Iceland</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
          <option value="Iraq">Iraq</option>
          <option value="Ireland">Ireland</option>
          <option value="Isle of Man">Isle of Man</option>
          <option value="Israel">Israel</option>
          <option value="Italy">Italy</option>
          <option value="Jamaica">Jamaica</option>
          <option value="Japan">Japan</option>
          <option value="Jersey">Jersey</option>
          <option value="Jordan">Jordan</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kenya">Kenya</option>
          <option value="Kiribati">Kiribati</option>
          <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
          <option value="Korea, Republic of">Korea, Republic of</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
          <option value="Latvia">Latvia</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Lesotho">Lesotho</option>
          <option value="Liberia">Liberia</option>
          <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
          <option value="Liechtenstein">Liechtenstein</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Macao">Macao</option>
          <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
          <option value="Madagascar">Madagascar</option>
          <option value="Malawi">Malawi</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Maldives">Maldives</option>
          <option value="Mali">Mali</option>
          <option value="Malta">Malta</option>
          <option value="Marshall Islands">Marshall Islands</option>
          <option value="Martinique">Martinique</option>
          <option value="Mauritania">Mauritania</option>
          <option value="Mauritius">Mauritius</option>
          <option value="Mayotte">Mayotte</option>
          <option value="Mexico">Mexico</option>
          <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
          <option value="Moldova, Republic of">Moldova, Republic of</option>
          <option value="Monaco">Monaco</option>
          <option value="Mongolia">Mongolia</option>
          <option value="Montenegro">Montenegro</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Morocco">Morocco</option>
          <option value="Mozambique">Mozambique</option>
          <option value="Myanmar">Myanmar</option>
          <option value="Namibia">Namibia</option>
          <option value="Nauru">Nauru</option>
          <option value="Nepal">Nepal</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Netherlands Antilles">Netherlands Antilles</option>
          <option value="New Caledonia">New Caledonia</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Niger">Niger</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Niue">Niue</option>
          <option value="Norfolk Island">Norfolk Island</option>
          <option value="Northern Mariana Islands">Northern Mariana Islands</option>
          <option value="Norway">Norway</option>
          <option value="Oman">Oman</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Palau">Palau</option>
          <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
          <option value="Panama">Panama</option>
          <option value="Papua New Guinea">Papua New Guinea</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Peru">Peru</option>
          <option value="Philippines">Philippines</option>
          <option value="Pitcairn">Pitcairn</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Puerto Rico">Puerto Rico</option>
          <option value="Qatar">Qatar</option>
          <option value="Reunion">Reunion</option>
          <option value="Romania">Romania</option>
          <option value="Russian Federation">Russian Federation</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Saint Helena">Saint Helena</option>
          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
          <option value="Saint Lucia">Saint Lucia</option>
          <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
          <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
          <option value="Samoa">Samoa</option>
          <option value="San Marino">San Marino</option>
          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Senegal">Senegal</option>
          <option value="Serbia">Serbia</option>
          <option value="Seychelles">Seychelles</option>
          <option value="Sierra Leone">Sierra Leone</option>
          <option value="Singapore">Singapore</option>
          <option value="Slovakia">Slovakia</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Solomon Islands">Solomon Islands</option>
          <option value="Somalia">Somalia</option>
          <option value="South Africa">South Africa</option>
          <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
          <option value="Spain">Spain</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="Sudan">Sudan</option>
          <option value="Suriname">Suriname</option>
          <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
          <option value="Swaziland">Swaziland</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Syrian Arab Republic">Syrian Arab Republic</option>
          <option value="Taiwan">Taiwan</option>
          <option value="Tajikistan">Tajikistan</option>
          <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
          <option value="Thailand">Thailand</option>
          <option value="Timor-leste">Timor-leste</option>
          <option value="Togo">Togo</option>
          <option value="Tokelau">Tokelau</option>
          <option value="Tonga">Tonga</option>
          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
          <option value="Tunisia">Tunisia</option>
          <option value="Turkey">Turkey</option>
          <option value="Turkmenistan">Turkmenistan</option>
          <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
          <option value="Tuvalu">Tuvalu</option>
          <option value="Uganda">Uganda</option>
          <option value="Ukraine">Ukraine</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Vanuatu">Vanuatu</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Viet Nam">Viet Nam</option>
          <option value="Virgin Islands, British">Virgin Islands, British</option>
          <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
          <option value="Wallis and Futuna">Wallis and Futuna</option>
          <option value="Western Sahara">Western Sahara</option>
          <option value="Yemen">Yemen</option>
          <option value="Zambia">Zambia</option>
          <option value="Zimbabwe">Zimbabwe</option>
      </select>
          </div>
          <div class="form-group">
            <label className='form_label' for="phone">Phone</label>
            <input type="text" className="form-control" value={signFormData.phone} onChange={handleSignUpChange} id="phone" name="phone" placeholder="Enter your phone number" required/>
          </div>
          <div class="form-group">
            <label className='form_label' for="photo">Upload Profile</label>
            <br/>
            <FileBase type='file' class="form-control-file" onDone={({base64}) => setSignFormData({...signFormData, photo: base64})} name="photo" id="photo" multiple={false} required></FileBase>
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
  export default EditUserModal;