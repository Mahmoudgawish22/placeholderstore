import React, {useState, useEffect} from 'react'
import '../edittypes/editTypes.css'
import EditTypeModal from './typesModal/editTypeModal'
import { useSelector } from 'react-redux'


const EditTypes = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const types = useSelector((state) => state.types);
    const [show, setShow] = useState(false);
    const [Data, setData] = useState({ });

    const handleClick = (item) => {
        setData(item)
        setShow(true);
    }
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
      if (types.length==0) {
          setDisplay2(true)
      } else {
          setDisplay2(false)
      }
  }, [types]) 
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
            <div id='edit_types'>
            {types.slice(0).reverse().map(item=>
            <div className='type_display' key={item._id}>
            <img src={item.photo} alt='user_profile' className='type_img_display'/>
            <button onClick={()=> handleClick(item)} className='btn btn-block btn-dark btn-type'><i class="fas fa-pencil-alt"></i></button>
            </div>
            )}
            <EditTypeModal
            show={show}
            type_data= {Data}
            onHide={() => setShow(false)}
            />
        </div>}
        </div>
    )
} else {
    window.location.replace("/");
}
}

export default EditTypes
