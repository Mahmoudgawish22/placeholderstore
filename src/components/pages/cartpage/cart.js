import React, {useState, useEffect} from 'react'
import '../cartpage/cart.css'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {addToCart, removeallFromCart, removeFromCart} from '../../../actions/users'
import { useDispatch } from 'react-redux'
import DoneModal from '../mainModals/doneModal'
import LikeLodadingModal from '../mainModals/likeModal'
import CheckOutModal from './checkoutModal/checkoutModal'



export default function Cart(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const userWeNeed = useSelector((state)=> state.users).filter(item=> item._id==user?.result._id);
    const productsWeNeed = useSelector((state)=> state.products).filter(item=> item.quantity>0).filter(item=> userWeNeed[0]?.cart.find(item2=> item2==item._id));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let priceArr = productsWeNeed.map(item=> item.offersIn.length>0?  item.afterPrice - (item.afterPrice * (item.offersIn[0] / 100)):item.afterPrice)
    const price = priceArr.reduce(reducer, 0)
    const [display, setDisplay] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();
    const [likeLodaing, setLikeLoading] = useState(false);
    const [doneModal, setDoneModal] = useState(false);

    const [Ordered, setOrdered] = useState(false);

    const [Data, setData] = useState({ });
    const [show, setShow] = useState(false);
    const handleClick = () => {
        setData({products: productsWeNeed, price: price, orderedFunc: setOrdered})
        setShow(true);
    }

    const openPost = (id) => {history.push(`/product/${id}`)}

    useEffect(() => {
        if (productsWeNeed.length==0) {
            setDisplay(true)
        } else {
            setDisplay(false)
        }
    }, [productsWeNeed])   

    const removeDynamically = () => {
        dispatch(removeallFromCart(user.result._id, history))
    }

    useEffect(() => {
        if (Ordered) {
            removeDynamically();
        }
    }, [Ordered])   

    const addToUserCart = (id) => {
        setLikeLoading(true);
        dispatch(addToCart(user.result._id, {cart: id}, setDoneModal, history, setLikeLoading));
       }
       

    if (user?.result?.name) {
    return (
        <div id='cart'>
            {display? 
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
            <div id='cart_products'>
                {productsWeNeed.map(item=>
                    <div className='cart_product__card'>
                    <a style={{textDecoration: 'none', borderRight: '1px solid #14141452', cursor: 'pointer'}} onClick={()=> openPost(item._id)}>
                    <img className='cart_product__img' src={item.photo}/>
                    </a>
                    <div className='cart_product__details'>
                    <label style={{fontSize: '25px', textAlign: 'center'}}>{item.name.slice(0,12)+ '...'}</label>
                    <div className='name' style={{display:'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent:'center'}}>
                    <label style={{ color: '#1d1d1f'}}>{
                           item.offersIn.length>0? 
                           <span>
                           <span style={{textDecoration: 'line-through', marginRight: '5px'}}>{item.afterPrice}</span><span style={{ color: 'red'}}>{item.afterPrice - (item.afterPrice * (item.offersIn[0] / 100))}</span>
                           </span>
                            : item.afterPrice} AED
                    </label>
                    {item.offersIn.length>0?
                        <span  class="badge bg-dark">Sale: {item.offersIn[0]}%</span>
                    : null}
                    </div>
                        <div style={{display: 'flex', justifyContent:'space-between',alignItems: 'center', width: '100%'}}>
                        <button style={{alignSelf: 'flex-end'}} onClick={()=> addToUserCart(item._id)} className='btn btn-block btn-sm btn-danger'><i class="far fa-trash-alt" style={{fontSize: '15px'}}></i></button>
                        </div>
                    </div>
                  </div>
                    )}
                 
            </div>}
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <hr style={{color: '#000', width: '90%'}}/>
            <div id='cart_promo_code'>
                <label style={{fontSize: '25px'}}>Total Price: <span style={{fontSize: '30px'}}>{price} AED</span></label>
            </div>
            <br/>
            <label style={{textAlign: 'center'}}>After Clicking on This Button, And Before Going To Making Order, You Will Be Free To Choose Colors And Sizes..*</label>
            <button onClick={handleClick} className='btn btn-block btn-dark btn-lg widthclass'>Define properties And Checkout</button>
            </div>
            <DoneModal
                 show={doneModal}
                 textStatus= 'Done!'
                 onHide={() => setDoneModal(false)}
              />
              <LikeLodadingModal
                show={likeLodaing}
                backdrop="static"
            />
            <CheckOutModal
            show={show}
            order_data= {Data}
            onHide={() => setShow(false)}
            />
        </div>
    )
} else {
    window.location.replace("/");
}
}