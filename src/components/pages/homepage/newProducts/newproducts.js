import React, { useState, useEffect } from "react";
import '../newProducts/newproducts.css'
import Carousel from 'react-bootstrap/Carousel'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {addToCart , like, unLike} from '../../../../actions/users'
import DoneModal from '../../mainModals/doneModal'
import LikeLodadingModal from '../../mainModals/likeModal'



function NewProducts(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userWeNeed = useSelector((state)=> state.users).filter(item=> item._id==user?.result._id);
  const products = useSelector((state) => state.products).filter(item=> item.quantity>0);
  const getRating = (id) => {
    const productweNeed = products.filter(item=> item._id==id);
    const ratingsArr = productweNeed[0].rating.map(item=> item.rating);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const rating = ratingsArr.reduce(reducer, 0);
    return rating/ratingsArr.length;
  }
  const newProducts = products.slice(products.length-8)
    const [index, setIndex] = useState(0);
    const [likeLodaing, setLikeLoading] = useState(false);
    const [doneModal, setDoneModal] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const openPost = (id) => {history.push(`/product/${id}`)}
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const openPosts = (id) => {history.push(`/products/${id}`)}

    const addToUserCart = (id) => {
      setLikeLoading(true);
      dispatch(addToCart(user.result._id, {cart: id}, setDoneModal, history, setLikeLoading));
     }
     const addTolikeORemove = (id) => {
      setLikeLoading(true);
      dispatch(unLike(user.result._id, {liked: id}, history, setLikeLoading));
    }
    const [display2, setDisplay2] = useState(true);
    useEffect(() => {
      if (products.length==0) {
          setDisplay2(true)
      } else {
          setDisplay2(false)
      }
  }, [products]) 

    return (
        <div id='new_products'>
            <div id='offers__title' style={{padding: '20px', paddingBottom: '5px'}}>
                <label style={{fontSize: '27px'}} className='section__title'><i className="fas fa-truck"></i> New Products</label>
                <a className='seemore' style={{cursor: 'pointer'}} onClick={()=> openPosts('fornew')}>See More</a>
            </div>
            {display2? 
               <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px'}}>
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
            <Carousel activeIndex={index} onSelect={handleSelect}> 
            <Carousel.Item>
               <div className='products__slideShow'>
               {newProducts.slice(newProducts.length-4).map(item=> 
               <div key={item._id} className='product__card'>
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
                   {user? 
                    <div style={{display: 'flex', width: '100%'}}>
                    <button style={{width: '100%', borderRadius: '0px'}} onClick={()=> addTolikeORemove(item._id)} className='btn btn-block btn-danger' >{userWeNeed[0]?.liked.indexOf(item._id)>=0? <i class="far fa-thumbs-down"></i>:<i class="far fa-thumbs-up"></i> }</button>
                    <button style={{width: '100%', borderRadius: '0px'}} onClick={()=> addToUserCart(item._id)} className='btn btn-block btn-dark'>{userWeNeed[0]?.cart.indexOf(item._id)>=0? <i class="far fa-trash-alt"></i>:<i class="fab fa-opencart"></i>}</button>
                    </div> :
                    <a href='/login'>Sign In For Buy..</a>
                  }
               </div>
             </div>
              )}
               </div>
        </Carousel.Item>
        <Carousel.Item>
               <div className='products__slideShow'>
               {newProducts.slice(0,4).map(item=> 
               <div key={item._id} className='product__card'>
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
                   {user? 
                    <div style={{display: 'flex', width: '100%'}}>
                    <button style={{width: '100%', borderRadius: '0px'}} onClick={()=> addTolikeORemove(item._id)} className='btn btn-block btn-danger' >{userWeNeed[0]?.liked.indexOf(item._id)>=0? <i class="far fa-thumbs-down"></i>:<i class="far fa-thumbs-up"></i> }</button>
                    <button style={{width: '100%', borderRadius: '0px'}} onClick={()=> addToUserCart(item._id)} className='btn btn-block btn-dark'>{userWeNeed[0]?.cart.indexOf(item._id)>=0? <i class="far fa-trash-alt"></i>:<i class="fab fa-opencart"></i>}</button>
                    </div> :
                    <a href='/login'>Sign In For Buy..</a>
                  }
               </div>
             </div>
              )}
               </div>
        </Carousel.Item>
        </Carousel>}
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
}
export default NewProducts