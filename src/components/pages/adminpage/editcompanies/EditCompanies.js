import React, { useState, useEffect } from 'react'
import '../editcompanies/editCompanies.css'
import { useSelector } from 'react-redux'
import EditCompanyModal from './companiesModal/editCompanyModal'


const EditCompanies = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const companies = useSelector((state) => state.companies);
    const [show, setShow] = useState(false);
    const [companyData, setCompanyData] = useState({ });

    const handleClick = (item) => {
        setCompanyData(item)
        setShow(true);
    }
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
      if (companies.length==0) {
          setDisplay2(true)
      } else {
          setDisplay2(false)
      }
  }, [companies]) 
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
        <div id='edit_companies'>
            {companies.slice(0).reverse().map(item=> 
                <div className='company_display' key={item._id}>
                <img src={item.logo} alt='company_profile' className='company_img_display'/>
                <button className='btn btn-block btn-dark btn-company' onClick={()=> handleClick(item)}><i className="fas fa-pencil-alt"></i></button>
                </div>
                )}
        <EditCompanyModal
            show={show}
            company_data= {companyData}
            onHide={() => setShow(false)}
        />
        </div>}
    </div>
    )
} else {
    window.location.replace("/");
}
}

export default EditCompanies
