import React, { useState, useEffect } from 'react'
import '../editproducts/editProducts.css'
import { useSelector } from 'react-redux'
import EditProductModal from './productsModal/editProductModal'

const EditProducts = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const products = useSelector((state)=> state.products).filter(item=> item.quantity>0)

    const [show, setShow] = useState(false);
    const [Data, setData] = useState({ });

    const handleClick = (item) => {
        setData(item)
        setShow(true);
    }
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
      if (products.length==0) {
          setDisplay2(true)
      } else {
          setDisplay2(false)
      }
  }, [products]) 
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
               <div id='edit_products'>
               {products.map(item=> 
                <div key={item._id} className='product_edit_display'>
                <img src={item.photo} alt='user_profile' className='product_img_display'/>
                <span class="badge bg-danger ms-2">{item.quantity}</span>
                <button onClick={()=> handleClick(item)} className='btn btn-block btn-dark btn-product'><i className="fas fa-pencil-alt"></i></button>
                </div>
                )}
            <EditProductModal
                 show={show}
                 product_data= {Data}
                 onHide={() => setShow(false)}
              />
        </div>}
        </div>
    )
} else {
    window.location.replace("/");
}
}

export default EditProducts
