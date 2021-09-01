import React, {useState, useEffect} from 'react'
import '../likedpage/liked.css'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import DoneModal from '../mainModals/doneModal'
import LikeLodadingModal from '../mainModals/likeModal'
import { useDispatch } from 'react-redux'
import {addToCart , like, unLike} from '../../../actions/users'

export default function Liked(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const userWeNeed = useSelector((state)=> state.users).filter(item=> item._id==user?.result._id);
    const productsWeNeed = useSelector((state)=> state.products).filter(item=> item.quantity>0).filter(item=> userWeNeed[0]?.liked.find(item2=> item2==item._id));
    const [display, setDisplay] = useState(true);

    const getRating = (id) => {
        const productweNeed = productsWeNeed.filter(item=> item._id==id);
        const ratingsArr = productweNeed[0].rating.map(item=> item.rating);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const rating = ratingsArr.reduce(reducer, 0);
        return rating/ratingsArr.length;
      }

    const history = useHistory();
    const dispatch = useDispatch();
    const [likeLodaing, setLikeLoading] = useState(false);
    const [doneModal, setDoneModal] = useState(false);
    
   useEffect(() => {
        if (productsWeNeed.length==0) {
            setDisplay(true)
        } else {
            setDisplay(false)
        }
    }, [productsWeNeed])   

    const addToUserCart = (id) => {
        setLikeLoading(true);
        dispatch(addToCart(user.result._id, {cart: id}, setDoneModal, history, setLikeLoading));
       }
       const addTolikeORemove = (id) => {
        setLikeLoading(true);
        dispatch(unLike(user.result._id, {liked: id}, history, setLikeLoading));
      }
    

      const openPost = (id) => {history.push(`/product/${id}`)}

    if (user?.result?.name) {
    return (
        <div > 
        {display? 
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px'}}>
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
       <div id='liked'>
            {productsWeNeed?.map(item=> 
                <div className='product__card'>
                <a style={{textDecoration: 'none', cursor: 'pointer'}} onClick={()=> openPost(item._id)}>
                <img className='product__img'  src={item.photo}/>
                </a>
                <div className='product__details'>
                    <div className='rating_loved'>
                    {
                            getRating(item._id)==1?
                            <label>
                            <i style={{color: '#1d1d1d'}} class="fas fa-star"></i>
                             </label> :
                            getRating(item._id)==2?
                            <label>
                            <i style={{color: '#1d1d1d'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i> 
                            </label> :
                            getRating(item._id)==3?
                            <label>
                            <i style={{color: '#1d1d1d'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            </label> :
                            getRating(item._id)==4?
                            <label>
                            <i style={{color: '#1d1d1d'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            </label> :
                            getRating(item._id)==5?
                            <label>
                            <i style={{color: '#1d1d1d'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            </label> :
                            null
                          }
                    </div>
                    <div className='name' style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <label style={{ color: '#1d1d1f'}}>{
                   item.offersIn.length>0? 
                   <span>
                   <span style={{textDecoration: 'line-through', marginRight: '5px'}}>{item.afterPrice}</span><span style={{ color: 'red'}}>{item.afterPrice - (item.afterPrice * (item.offersIn[0] / 100))}</span>
                   </span>
                    : item.afterPrice} AED</label>
                        {item.offersIn.length>0?
                         <span class="badge bg-danger">Sale: {item.offersIn[0]}%</span>
                        : null}
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                    <button style={{width: '100%', borderRadius: '0px'}} onClick={()=> addTolikeORemove(item._id)} className='btn btn-block btn-danger' ><i class="far fa-thumbs-down"></i></button>
                    <button style={{width: '100%', borderRadius: '0px'}} onClick={()=> addToUserCart(item._id)} className='btn btn-block btn-dark'>{userWeNeed[0]?.cart.indexOf(item._id)>=0? <i class="far fa-trash-alt"></i>:<i class="fab fa-opencart"></i>}</button>
                    </div>
                </div>
              </div>
                )} 
            </div> }
            <DoneModal
                 show={doneModal}
                 textStatus= 'Done!'
                 onHide={() => setDoneModal(false)}
              />
              <LikeLodadingModal
                show={likeLodaing}
                backdrop="static"
            />
        
        </div>
    )
} else {
    window.location.replace("/");
}
}