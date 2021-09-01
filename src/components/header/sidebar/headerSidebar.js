import { slide as Menu } from 'react-burger-menu'
import React, {useState, useEffect} from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import '../sidebar/headerSidebar.css'
import userLogo from '../../../img/blind.svg'
import favorites from '../../../img/heart.png'
import cart from '../../../img/shopping-cart.png'
import orders from '../../../img/order.png'
import sell from '../../../img/shopping.png'
import who from '../../../img/agile.png'
import cpa from '../../../img/videogame.png'
import logout from '../../../img/log-out.png'
import dashboard from '../../../img/dashboard.png'
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'




function HeaderSidebar(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const userWeNeed = useSelector((state)=> state.users).filter(item=> item._id==user?.result._id);
  const ordersWeNeed =  useSelector((state)=> state.orders).filter(item=> item.user==user?.result._id);
  const countOfWaitngOrders = ordersWeNeed.filter(item=> item.orderStatus!=='Done');



    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const logOut = () => {
      dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }
    
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

  const [display, setDisplay] = useState(false); 
  const [display2, setDisplay2] = useState(false); 
  const handleClick = () => {
    if (display) {
      setDisplay(false);
    } else {
      setDisplay(true)
    }
  }
  const handleClick2 = () => {
    if (display2) {
      setDisplay2(false);
    } else {
      setDisplay2(true)
    }
  }
  const openPost = (id) => {history.push(`/products/${id}`)}
  const openLink = (str) => {
    history.push(str)
}
  if (
   location.pathname == '/cpa' | location.pathname =='/cpa/add-user' 
   | location.pathname =='/cpa/add-company'| location.pathname =='/cpa/add-offer' 
   | location.pathname =='/cpa/add-product' | location.pathname =='/cpa/add-type'
   | location.pathname =='/cpa/edit-users' | location.pathname =='/cpa/edit-companies' 
   | location.pathname =='/cpa/edit-products'| location.pathname =='/cpa/edit-types'
   | location.pathname =='/cpa/news-emails' | location.pathname =='/cpa/edit-offers'
   | location.pathname =='/cpa/orders-managment' | location.pathname =='/cpa/returns-managment'
   | location.pathname =='/cpa/archive-managment'  | location.pathname =='/cpa/ods') {
    if (user?.result.userStatus=='admin') {
    return (
      <Menu>
        <label id='sidebar__label'>Welcome to Placeholder!</label>
        <hr/>
        <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
        <a className='nav-link2' style={{display: 'flex', gap: '5px', cursor: 'pointer'}} onClick={()=>openLink('/')}>
          <img id='user_profile2' src={user?.result.photo} alt='user_profile'/>Home</a>
        </div>
        <hr/>
        <a className="nav-link2" onClick={()=>openLink('/cpa/add-user')} style={{cursor: 'pointer'}}>Add User</a>
        <a className="nav-link2" onClick={()=>openLink('/cpa/edit-users')} style={{cursor: 'pointer'}} target="_self">Edit Users</a>
        <hr/>
        <a className="nav-link2" onClick={()=>openLink('/cpa/add-product')} style={{cursor: 'pointer'}} target="_self">Add Product</a>
        <a className="nav-link2" onClick={()=>openLink('/cpa/edit-products')} style={{cursor: 'pointer'}}>Edit Products</a>
        <hr/>
        <a className="nav-link2" onClick={()=>openLink('/cpa/add-offer')} style={{cursor: 'pointer'}} target="_self">Add Offer</a>
        <a className="nav-link2" onClick={()=>openLink('/cpa/edit-offers')} style={{cursor: 'pointer'}} target="_self">Edit Offers</a>
        <hr/>
        <a className="nav-link2" onClick={()=>openLink('/cpa/ods')} style={{cursor: 'pointer'}} target="_self">Offers Display System</a>
        <hr/>
        <a className="nav-link2" onClick={()=>openLink('/cpa/orders-managment')} style={{cursor: 'pointer'}}>Orders</a>
        <a className="nav-link2" onClick={()=>openLink('/cpa/returns-managment')} style={{cursor: 'pointer'}}>Returns</a>
        <a className="nav-link2" onClick={()=>openLink('/cpa/archive-managment')} style={{cursor: 'pointer'}} target="_self">Archive</a>
        <hr/>
        <a className="nav-link2" onClick={()=>openLink('/cpa/add-company')} style={{cursor: 'pointer'}}>Add Company</a>
        <a className="nav-link2" onClick={()=>openLink('/cpa/edit-companies')} style={{cursor: 'pointer'}} target="_self">Edit Company</a>
        <hr/>
        <a className="nav-link2" onClick={()=>openLink('/cpa/add-type')} style={{cursor: 'pointer'}} target="_self">Add Type</a>
        <a className="nav-link2" onClick={()=>openLink('/cpa/edit-types')} style={{cursor: 'pointer'}}>Edit Types</a>
        <hr/>
        <a className="nav-link2" onClick={()=>openLink('/cpa/news-emails')} style={{cursor: 'pointer'}} target="_self">News Emails</a>
        <a className="nav-link2" onClick={()=>openLink('/cpa')} style={{cursor: 'pointer'}} target="_self">Statistics</a>
        <hr/>
      </Menu>
    )
    }
  }
    return (
      <Menu>
        <label id='sidebar__label'>Welcome to Placeholder!</label>
        <hr/>
        <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
          {!user?.result.name?
        <a className='nav-link2' style={{display: 'flex', gap: '5px', cursor: 'pointer'}} onClick={()=>openLink('/login')}>
          <img id='user_profile2' src={userLogo} alt='user_profile'/>Sign In | Sign Up</a>
          : 
          <span style={{display: 'flex', flexDirection: 'column', gap:'5px'}}>
          <a style={{display: 'flex', gap: '5px', alignItems: 'center'}} className="nav-link2" onClick={handleClick2}><img id='user_profile2' src={user?.result.photo} alt='user_profile'/>Mahmoud {!display2? <i class="fas fa-chevron-right"></i> : <i class="fas fa-chevron-down"></i>}</a>
        {display2? 
        <span style={{display: 'flex', flexDirection: 'column', gap:'5px'}}>
        <a className='nav-link2' style={{display: 'flex', gap: '5px', cursor: 'pointer'}} onClick={()=>openLink('/user')}>
          <img className='header__icons' src={dashboard} alt='user_profile'/>Profile</a>
        <a className='nav-link2' style={{display: 'flex', gap: '5px', cursor: 'pointer'}} onClick={()=>openLink('/liked')}>
          <img src={favorites} alt='favorites_icon' className='header__icons'/>Favorites<span class="badge rounded-pill bg-danger ms-2">{userWeNeed[0]?.liked.length}</span></a>
        <a className='nav-link2' style={{display: 'flex', gap: '5px', cursor: 'pointer'}} onClick={()=>openLink('/cart')}>
          <img src={cart} alt='favorites_icon' className='header__icons'/>Cart<span class="badge rounded-pill bg-danger ms-2">{userWeNeed[0]?.cart.length}</span></a>
        <a className='nav-link2' style={{display: 'flex', gap: '5px', cursor: 'pointer'}} onClick={()=>openLink('/orders')}>
          <img src={orders} alt='favorites_icon' className='header__icons'/>Orders<span class="badge rounded-pill bg-danger ms-2">{countOfWaitngOrders?.length}</span></a>
          {user?.result.userStatus=='admin'? 
          <a className='nav-link2' style={{display: 'flex', gap: '5px', cursor: 'pointer'}} onClick={()=>openLink('/cpa')}>
          <img src={cpa} alt='favorites_icon' className='header__icons'/>Control Panel</a>: null
                }
          <a className='nav-link2' style={{display: 'flex', gap: '5px'}} onClick={logOut}>
          <img src={logout} alt='favorites_icon' className='header__icons'/>Log Out</a>
        </span>
        : null
        }
        </span>
        }
        <a className='nav-link2' style={{display: 'flex', gap: '5px', cursor: 'pointer'}} onClick={()=>openLink('/who')}>
            <img src={who} alt='favorites_icon' className='header__icons'/>
            Who We Are?
        </a>
        <a className='nav-link2' style={{display: 'flex', gap: '5px', cursor: 'pointer'}} onClick={()=>openLink('/sell')}>
            <img src={sell} alt='favorites_icon' className='header__icons'/>
            Sell With Us
        </a>
        </div>
        <hr/>
        
        <a className="nav-link2" onClick={handleClick}> {!display? <i class="fas fa-arrow-right"></i> : <i class="fas fa-arrow-down"></i>} Browse Sections</a>
        {display? 
        <span style={{display: 'flex', flexDirection: 'column'}}>
        <a className="nav-link2" style={{fontSize: '17px', cursor: 'pointer'}} onClick={()=> openPost('formen')}>For Men</a>
        <a className="nav-link2" style={{fontSize: '17px', cursor: 'pointer'}} onClick={()=> openPost('forwomen')}>For Women</a>
        <a className="nav-link2" style={{fontSize: '17px', cursor: 'pointer'}} onClick={()=> openPost('forkids')}>For Kids</a>
        <a className="nav-link2" style={{fontSize: '17px', cursor: 'pointer'}} onClick={()=> openPost('forallgenders')}>All</a>
        </span>
        : <span/>
        }
        
        <a className="nav-link2" href="/#new_products"><i className="fas fa-truck"></i> New Products</a>
        <a className="nav-link2" href="/#offers" target="_self"><i className="fas fa-cart-plus"></i> Special Offers</a>
        <a className="nav-link2" href="/#best_sell" target="_self"><i className="fas fa-fire"></i> Best Seller</a>
      </Menu>
    );
  }
export default HeaderSidebar