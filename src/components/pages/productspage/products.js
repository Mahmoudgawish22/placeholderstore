import React, {useState, useEffect} from 'react'
import '../productspage/products.css'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import LoadingModal from '../mainModals/loadingModal'
import {addToCart , like, unLike} from '../../../actions/users'
import DoneModal from '../mainModals/doneModal'
import LikeLodadingModal from '../mainModals/likeModal'
import { useDispatch } from 'react-redux'




export default function Products(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userWeNeed = useSelector((state)=> state.users).filter(item=> item._id==user?.result._id);
    const products = useSelector((state)=> state.products).filter(item=> item.quantity>0);
    const getRating = (id) => {
      const productweNeed = products.filter(item=> item._id==id);
      const ratingsArr = productweNeed[0].rating.map(item=> item.rating);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const rating = ratingsArr.reduce(reducer, 0);
      return rating/ratingsArr.length;
    }
    const companies = useSelector((state)=> state.companies);
    const types = useSelector((state) => state.types);
    const [likeLodaing, setLikeLoading] = useState(false);
    const [doneModal, setDoneModal] = useState(false);
    const [display, setDisplay] = useState(false);
    const [displayDiv, setDisplayDiv] = useState(true);

    const {id} = useParams();
    const selectedType = types.filter(item=> item.name==id)
    const history = useHistory();
    const dispatch = useDispatch();
    const [DataForm, SetDataForm] = useState({
      company: 'all',
      for: 'all',
      mainType: 'all',
      products: []
    })

    useEffect(() => {
      window.scrollTo(0, 0);
      if (products.length==0) {
        setDisplayDiv(true)
    } else {
      setDisplayDiv(false)
    }
     if(id == 'formen') {
       SetDataForm({company: 'all', for: 'man', mainType: 'all', products: products.filter(item=> item.for=='man')})
     } else if (id == 'forwomen') {
      SetDataForm({company: 'all', for: 'women', mainType: 'all', products: products.filter(item=> item.for=='man')})
     } else if (id == 'forkids') {
      SetDataForm({company: 'all', for: 'kid', mainType: 'all', products: products.filter(item=> item.for=='kid')})
     } else if (id == 'forallgenders') {
      SetDataForm({company: 'all', for: 'all', mainType: 'all', products: [...products]})
     } else if (id == 'forall') {
      SetDataForm({company: 'all', for: 'all', mainType: 'all', products: [...products]})
     } else if (id == 'forbest') {
      const soreted = [].concat(products.sort(function(a, b){return a.ordered - b.ordered}));
      SetDataForm({company: 'all', for: 'all', mainType: 'all', products: soreted.slice(soreted.length-8)})
     } else if (id == 'fornew') {
       SetDataForm({company: 'all', for: 'all', mainType: 'all', products: products.slice(products.length-8)})
     } else if (selectedType.length > 0) {       
       SetDataForm({company: 'all', for: 'all', mainType: selectedType[0].name, products: products.filter(item=> item.mainType == selectedType[0].name)})
     } else {
      SetDataForm({company: 'all', for: 'all', mainType: 'all', products: [...products]})
     }
  }, [id, products])
    const handleChange = (e) => {
      SetDataForm({...DataForm, [e.target.name]: e.target.value});
    }
    const openPost = (id) => {history.push(`/product/${id}`)}
    const handleSubmit = () => {
      if(DataForm.mainType=='all' && DataForm.for=='all' && DataForm.company=='all') {
        SetDataForm({company: DataForm.company, for: DataForm.for, mainType: DataForm.mainType,products: [...products]})
      } else if (DataForm.mainType=='all' && DataForm.for=='all') {
        SetDataForm({company: DataForm.company, for: DataForm.for, mainType: DataForm.mainType, products: products.filter(item=> item.company==DataForm.company)})
      } else if (DataForm.for=='all' && DataForm.company=='all') {
        SetDataForm({company: DataForm.company, for: DataForm.for, mainType: DataForm.mainType, products: products.filter(item=> item.mainType==DataForm.mainType)})
      } else if (DataForm.mainType=='all' && DataForm.company=='all') {
        SetDataForm({company: DataForm.company, for: DataForm.for, mainType: DataForm.mainType, products: products.filter(item=> item.for==DataForm.for)})
      } else if (DataForm.mainType=='all') {
        SetDataForm({company: DataForm.company, for: DataForm.for, mainType: DataForm.mainType, products: products.filter(item=> item.for==DataForm.for && item.company==DataForm.company)})
      } else if (DataForm.for=='all') {
        SetDataForm({company: DataForm.company, for: DataForm.for, mainType: DataForm.mainType, products: products.filter(item=> item.mainType==DataForm.mainType && item.company==DataForm.company)})
      } else if (DataForm.company=='all') {
        SetDataForm({company: DataForm.company, for: DataForm.for, mainType: DataForm.mainType, products: products.filter(item=> item.mainType==DataForm.mainType && item.for==DataForm.for)})
      } else {
        SetDataForm({company: DataForm.company, for: DataForm.for, mainType: DataForm.mainType, products: products.filter(item=> item.mainType==DataForm.mainType && item.for==DataForm.for && item.company==DataForm.company)})

      }
    }
    const addToUserCart = (id) => {
      setLikeLoading(true);
      dispatch(addToCart(user.result._id, {cart: id}, setDoneModal, history, setLikeLoading));
     }
     const addTolikeORemove = (id) => {
      setLikeLoading(true);
      dispatch(unLike(user.result._id, {liked: id}, history, setLikeLoading));
    }
    return (
        <div>
          {displayDiv? 
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
       <div id='products'>
          {display? 
          <div id='products_filter' style={{width: '100%'}}>
          <div id='filter_form'>
              <div class="form-group">
                <label className='form_label' for="for">For:</label>
                <select id="product_for" value={DataForm.for} onChange={handleChange} name="for" className="form-control">
                   <option value="man">Man</option>
                   <option value="women">Woman</option>
                   <option value="kid">Kid</option>
                   <option value="all">All</option>
                 </select>
              </div>
              <div class="form-group">
                <label className='form_label' for="mainType">Main Type:</label>
                <select id="main_type" value={DataForm.mainType} onChange={handleChange} name="mainType" className="form-control">
                {types.map(item=> 
                    <option key={item._id} value={item.name}>{item.name}</option>
                    )}
                    <option value="all">All</option>
                 </select>
              </div>
              <div class="form-group">
                <label className='form_label' for="company">Company:</label>
                <select id="company" value={DataForm.company} onChange={handleChange} name="company" className="form-control">
                    {companies.map(item=> 
                    <option key={item._id} value={item.name}>{item.name}</option>
                    )}
                    <option value='all'>All</option>
                 </select>
              </div>
              <button type="submit" onClick={handleSubmit} style={{backgroundColor: '#141414', alignSelf: 'flex-end'}} className="btn btn-dark">Filter</button>
            </div>
          </div> : null
        }
            <button className='btn btn-block btn-outline-dark' onClick={()=> display? setDisplay(false) : setDisplay(true)} style={display? {color: '#1d1d1f', fontSize: '20px'} : {color: '#141414', fontSize: '20px'}}>{display? <i class="fas fa-window-close"></i> : <i class="fas fa-pencil-ruler"></i>} Filter</button>
            <div className='products__slideShow' style={{width: '100%'}}>
              {DataForm.products.map(item=> 
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
            </div>}

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