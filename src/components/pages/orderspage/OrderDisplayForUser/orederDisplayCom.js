import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import replace from '../../../../img/Placeholder.png'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { updateProductRating } from '../../../../actions/products'




const OrderDisplayCom = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const productWeNeed = useSelector((state)=> state.products).filter(item=> item._id==props.productID);
    const userRated = productWeNeed[0]?.rating.filter(item=> item.userId==user.result._id)
    const [rating, setRating] = useState(1);
    const [display, setDisplay] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

      const handleRating = (id) => {
        setDisplay(false);
        dispatch(updateProductRating(id, {...productWeNeed[0], rating: [...productWeNeed[0].rating, {rating: rating, userId: user.result._id}]}, history, setDisplay))
      }
    return (
            <div key={props.productID} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <img className='product_img_check' src={productWeNeed[0]?.photo || replace} alt='product_img' style={{height:'200px', width:'200px', objectFit: 'cover', borderRadius: '50%'}}/>
                {props.dontDisplay?
                <div style={{gap: '5px', display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
                <h3 className='form_label' for="quantity">{productWeNeed[0].name.slice(0,8)}</h3>
                <label className='form_label' for="quantity">Quantity: {props.quantity}</label>
                <div style={{height:'20px', width: '20px', backgroundColor: props.color}}></div>
                <label style={{fontSize: '20px'}}>{props.size?.toUpperCase()}</label>
                <label className='form_label' for="quantity">From: {productWeNeed[0].company}</label>
              </div>
               :
                props.orderStatus=="Done"?
                <div class="form-group">
                <input style={{borderBottomLeftRadius: '0px',borderBottomRightRadius: '0px', borderBottom: 'none'}} type="number" min={1} max={5} name='rating' class="form-control" onChange={(e)=> setRating(e.target.value)} placeholder="?/5"/>
                {userRated?.length>0?
                <button style={{width: '100%', borderTopLeftRadius: '0px',borderTopRightRadius: '0px'}} className='btn btn-block btn-warning btn-sm' onClick={()=>handleRating(props.productID)} disabled>Done!</button>
                :<button style={{width: '100%', borderTopLeftRadius: '0px',borderTopRightRadius: '0px'}} className='btn btn-block btn-warning btn-sm' id='btnToDis' onClick={()=>handleRating(props.productID)}>
                  {display? 
                  'Rate!' :
                  <div class="spinner-border spinner-border-sm" role="status">
                   <span class="sr-only">Loading...</span>
                  </div>}
                  </button> }
              </div>
             :
                <div style={{gap: '5px', display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
                  <h3 className='form_label' for="quantity">{productWeNeed[0]?.name?.slice(0,8)}</h3>
                  <label className='form_label' for="quantity">Quantity: {props.quantity}</label>
                  <div style={{height:'20px', width: '20px', backgroundColor: props.color}}></div>
                  <label style={{fontSize: '20px'}}>{props.size?.toUpperCase()}</label>
                  <label className='form_label' for="quantity">From: {productWeNeed[0]?.company}</label>
                </div>}
          </div>
    )
}

export default OrderDisplayCom
