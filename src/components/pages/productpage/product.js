import React, {useEffect, useState} from 'react'
import '../productpage/product.css'
import product1 from '../../../img/Placeholder.png'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import LoadingModal from '../mainModals/loadingModal'
import DoneModal from '../mainModals/doneModal'
import LikeLodadingModal from '../mainModals/likeModal'
import { useDispatch } from 'react-redux'
import {addToCart , like, unLike} from '../../../actions/users'
import { getProduct } from '../../../actions/products'


export default function Product(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const {id} = useParams();
    const product = useSelector((state)=> state.product);

    const getRating = (productRatingArr) => {
        const ratingsArr = productRatingArr?.map(item=> item.rating);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const rating = ratingsArr?.reduce(reducer, 0);
        return rating/ratingsArr?.length;
      }

    const userWeNeed = useSelector((state)=> state.users).filter(item=> item._id==user?.result._id);
    const offerWeNeed = useSelector((state)=> state.offers).filter(item=> item.for==product.product?.for && item.mainType==product.product?.mainType && item.company==product.product?.company)

    const history = useHistory();
    const [loadingModalShow, setLoadingModalShow] = useState(true);
    const [likeLodaing, setLikeLoading] = useState(false);
    const [liked, setLiked] = useState(false);
    const [doneModal, setDoneModal] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getProduct(id, setLoadingModalShow, history ))
    }, [id])
    useEffect(() => {
        if (userWeNeed[0]?.liked.indexOf(id)>=0) {
            setLiked(true);
        }
    }, [userWeNeed])

   const addToUserCart = (id) => {
    setLikeLoading(true);
    dispatch(addToCart(user.result._id, {cart: id}, setDoneModal, history, setLikeLoading));
   }

   const addTolikeORemove = (id) => {
    setLikeLoading(true);
    dispatch(like(user.result._id, {liked: id}, history, liked, setLiked, setLikeLoading));
  }

    return (
        <div id='product'>
            <div id='product_page_upper'>
               <div id='product_page_slideshow'>
                       <img src={product?.product?.photo || product1} alt='product_imgs' className='product_page_img'/>
               </div>
               <div id='product_page_details'>
                   <label style={{fontSize: '50px'}}>{product?.product?.name || 'Placeholder'}</label>
                   {
                            getRating(product.product?.rating)==1?
                            <label>
                            <i style={{color: '#1d1d1d'}} class="fas fa-star"></i>
                             </label> :
                            getRating(product.product?.rating)==2?
                            <label>
                            <i style={{color: '#1d1d1d'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i> 
                            </label> :
                            getRating(product.product?.rating)==3?
                            <label>
                            <i style={{color: '#1d1d1d'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            </label> :
                           getRating(product.product?.rating)==4?
                            <label>
                            <i style={{color: '#1d1d1d'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            </label> :
                            getRating(product.product?.rating)==5?
                            <label>
                            <i style={{color: '#1d1d1d'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            <i style={{color: '#1d1d1f'}} class="fas fa-star"></i>
                            </label> :
                            null
                          }
                   <label style={{fontSize: '30px'}}>{
                   product?.product?.offersIn.length>0? 
                   <span>
                   <span style={{textDecoration: 'line-through', marginRight: '5px'}}>{product?.product?.afterPrice}</span><span style={{ color: 'red'}}>{product?.product?.afterPrice - (product?.product?.afterPrice * (product?.product?.offersIn[0] / 100))}</span>
                   </span>
                    : product?.product?.afterPrice} AED</label>
                    {product?.product?.offersIn.length>0?
                        <span class="badge bg-danger">Sale: {product?.product?.offersIn[0]}%</span>
                    : null}
                   <br/>
                   <ul style={{display: 'flex', alignItems: 'center',padding: '1px', justifyContent: 'flex-start',gap: '5px', fontSize: '15px', listStyle: 'none'}}>
                   {product?.product?.colors?.map(item=>
                        <li><div style={{height:'20px', width: '20px', backgroundColor: item}}></div></li>
                        )}
                   </ul>
                   <ul style={{display: 'flex', justifyContent: 'space-evenly',padding: '1px',fontSize: '20px', gap: '5px', listStyle: 'none'}}>
                   {product?.product?.size?.map(item=>
                        <li><label>{item.toUpperCase()}</label></li>
                        )}
                   </ul>
                   <label>
                       From: 
                       <img src={product?.companyImg} style={{height: '40px', width:'50px', marginLeft: '5px'}}/>
                   </label>
                   <p style={{fontStyle: 'italic'}}>
                   {product?.product?.discribtion || 'Placeholder'}
                   </p>
                   {user? 
                    <div style={{display: 'flex', width: '100%'}}>
                    <button style={{width: '100%', borderRadius: '0px'}} onClick={()=> addTolikeORemove(product.product._id)} className='btn btn-block btn-danger' >{liked? <i class="far fa-thumbs-down"></i>:<i class="far fa-thumbs-up"></i> }</button>
                    <button style={{width: '100%', borderRadius: '0px'}} onClick={()=> addToUserCart(product.product._id)} className='btn btn-block btn-dark'>{userWeNeed[0]?.cart.indexOf(product.product?._id)>=0? <i class="far fa-trash-alt"></i>:<i class="fab fa-opencart"></i>}</button>
                    </div> :
                    <a href='/login'>Sign In For Buy..</a>
                  }
                  <br/>
                    <label style={{textAlign: 'center'}}>Before Going To Making Order, You Will Be Free To Choose Colors And Sizes..*</label>
               </div>
            </div>
            <LoadingModal
                show={loadingModalShow}
                backdrop="static"
            />
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