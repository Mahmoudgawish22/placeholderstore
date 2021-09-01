import React, { useState, useEffect } from 'react'
import '../editUsers/editUsers.css'
import { useSelector } from 'react-redux'
import EditUserModal from './usersModal/editUserModal'
const EditUsers = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const users = useSelector((state) => state.users);
    const [show, setShow] = useState(false);
    const [Data, setData] = useState({ });

    const handleClick = (item) => {
        setData(item)
        setShow(true);
    }
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
      if (users.length==0) {
          setDisplay2(true)
      } else {
          setDisplay2(false)
      }
  }, [users]) 
    if (user?.result?.name && user?.result.userStatus=='admin') {
    return (
        <div style={{width: '100%'}}>
            {display2? 
               <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px'}}>
               <div class="spinner-boxh" >
                 <div class="configure-border-1h">  
                 <div class="configure-coreh"></div>
                 </div>  
                 <div class="configure-border-2h">
                 <div class="configure-coreh"></div>
                 </div> 
                        </div>
               </div> 
              :
            <div id='edit_users'>
            {users.map(item=> 
                <div key={item._id} className='user_display'>
                <img src={item.photo} alt='user_profile' className='user_img_display'/>
                <button onClick={()=> handleClick(item)} className='btn btn-block btn-dark btn-user'><i class="fas fa-pencil-alt"></i></button>
            </div>
                )}
            <EditUserModal
            show={show}
            user_data= {Data}
            onHide={() => setShow(false)}
        />
        </div>}
        </div>
    )
} else {
    window.location.replace("/");
}
}

export default EditUsers
