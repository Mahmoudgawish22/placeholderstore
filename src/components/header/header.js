import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import '../header/header.css'
import userLogo from '../../img/blind.svg'
import siteLogo from '../../img/shopping-cart.svg'
import favorites from '../../img/heart.png'
import cart from '../../img/shopping-cart.png'
import search from '../../img/loupe.png'
import orders from '../../img/order.png'
import sell from '../../img/shopping.png'
import who from '../../img/agile.png'
import cpa from '../../img/videogame.png'
import dashboard from '../../img/dashboard.png'
import logout from '../../img/log-out.png'
import HeaderSidebar from './sidebar/headerSidebar'
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import SearchModal from '../search/searchModal'





function Header(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const userWeNeed = useSelector((state)=> state.users).filter(item=> item._id==user?.result._id);
    const ordersWeNeed =  useSelector((state)=> state.orders).filter(item=> item.user==user?.result._id);
    const countOfWaitngOrders = ordersWeNeed.filter(item=> item.orderStatus!=='Done');


    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
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
    const openPost = (id) => {history.push(`/products/${id}`)}

    const openLink = (str) => {
        history.push(str)
    }
    const [show, setShow] = useState(false);

    const HandleSearch = () => {
        setShow(true);
    }

    if (
    location.pathname == '/cpa' | location.pathname =='/cpa/add-user'
    | location.pathname =='/cpa/add-company' | location.pathname =='/cpa/add-offer' 
    | location.pathname =='/cpa/add-product' | location.pathname =='/cpa/add-type'
    | location.pathname =='/cpa/edit-users' | location.pathname =='/cpa/edit-companies' 
    | location.pathname =='/cpa/edit-products'| location.pathname =='/cpa/edit-types' 
    | location.pathname =='/cpa/news-emails' | location.pathname =='/cpa/edit-offers'
    | location.pathname =='/cpa/orders-managment' | location.pathname =='/cpa/returns-managment'
    | location.pathname =='/cpa/archive-managment' | location.pathname =='/cpa/ods') {
        if (user?.result.userStatus=='admin') {
            return (
                <div id='big__header'>
                    <div id='mobile_header' style={{marginBottom: '40px'}}>
                        <HeaderSidebar/>
                        <div id='mobile__view'>
                          <a onClick={()=>openLink('/')} style={{cursor: 'pointer'}} id='header__realone__logo'>
                              <img src={siteLogo} alt='site_logo' className='site_logo'/>
                              <span className='logo_text' style={{color: 'white'}}>Placeholder</span>
                          </a>
                <div className="searchbar_mobile_view">
                     <a onClick={HandleSearch} className="search_icon_mobile_view btn btn-light langbtn"><i className="fas fa-search"></i></a>
                    </div>
                </div>
                    </div>
                   <div id='header'>
                       <div style={{padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <a onClick={()=>openLink('/')} style={{cursor: 'pointer'}} id='header__realone__logo'>
                            <img src={siteLogo} alt='site_logo' className='site_logo'/>
                            <span className='logo_text'>Placeholder</span>
                        </a>
                        <div id='header__realone__search'>
                        <a className='btn btn-light btn-sm langbtn' id='header_realone_btns' onClick={HandleSearch}>
                        <img src={search} alt='favorites_icon' className='header__icons'/>
                        Search
                         </a>
                            <a className='btn btn-light btn-sm langbtn' id='header__firstone__user' onClick={()=>openLink('/')} style={{cursor: 'pointer'}}>
                            <img id='user_profile' src={user?.result.photo} alt='user_profile'/>
                            Home
                        </a> 
                        </div>
                        </div>
                      <ul id="header__navbar">
                      <li><div className="dropdown show">
                        <a className="btn btn-link dropdown-toggle nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Users Managment
                        </a>
                       <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/add-user')} style={{cursor: 'pointer'}}>Add User</a>
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/edit-users')} style={{cursor: 'pointer'}}>Edit Users</a>
                       </div>
                    </div></li>
                          <li><div className="dropdown show">
                        <a className="btn btn-link dropdown-toggle nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Products Managment
                        </a>
                       <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/add-product')} style={{cursor: 'pointer'}}>Add Product</a>
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/edit-products')} style={{cursor: 'pointer'}}>Edit Products</a>
                       <hr/>
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/add-offer')} style={{cursor: 'pointer'}}>Add Offer</a>
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/edit-offers')} style={{cursor: 'pointer'}}>Edit Offers</a>
                       <hr/>
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/ods')} style={{cursor: 'pointer'}}>Offers Display System</a>
                       </div>
                    </div></li>
                          <li><div className="dropdown show">
                        <a className="btn btn-link dropdown-toggle nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Orders Managment
                        </a>
                       <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/orders-managment')} style={{cursor: 'pointer'}}>Orders</a>
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/returns-managment')} style={{cursor: 'pointer'}}>Returns</a>
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/archive-managment')} style={{cursor: 'pointer'}}>Archive</a>
                       </div>
                    </div></li>
                          <li><div className="dropdown show">
                        <a className="btn btn-link dropdown-toggle nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Companies Managment
                        </a>
                       <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/add-company')} style={{cursor: 'pointer'}}>Add Company</a>
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/edit-companies')} style={{cursor: 'pointer'}}>Edit Company</a>
                       </div>
                    </div></li>
                          <li><div className="dropdown show">
                        <a className="btn btn-link dropdown-toggle nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Types Managment
                        </a>
                       <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/add-type')} style={{cursor: 'pointer'}}>Add Type</a>
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/edit-types')} style={{cursor: 'pointer'}}>Edit Types</a>
                       </div>
                    </div></li>
                    <li><div className="dropdown show">
                        <a className="btn btn-link dropdown-toggle nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Additional Managment
                        </a>
                       <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                       <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa/news-emails')} style={{cursor: 'pointer'}} target="_self">News Emails</a>
                        <a className="dropdown-item subnav-link" onClick={()=>openLink('/cpa')} style={{cursor: 'pointer'}} target="_self">Statistics</a>
                       </div>
                    </div></li>
                          
                        </ul>
                    </div>
                    <SearchModal
                      show={show}
                      onHide={() => setShow(false)}
                    />
                </div>
            )
        }
        
    } 


    return (
        <div id='big__header'>
            <div id='mobile_header'>
                <HeaderSidebar/>
                <div id='mobile__view'>
                <a onClick={()=>openLink('/')} style={{cursor: 'pointer'}} id='header__realone__logo'>
                    <img src={siteLogo} alt='site_logo' className='site_logo'/>
                    <span className='logo_text' style={{color: 'white'}}>Placeholder</span>
                </a>
                <div className="searchbar_mobile_view">
                     <a onClick={HandleSearch} className="search_icon_mobile_view btn btn-light langbtn"><i className="fas fa-search"></i></a>
                    </div>
                </div>
            </div>
           <div id='header'>
               <div style={{padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <a onClick={()=>openLink('/')} style={{cursor: 'pointer'}} id='header__realone__logo'>
                    <img src={siteLogo} alt='site_logo' className='site_logo'/>
                    <span className='logo_text'>Placeholder</span>
                </a>
                <div id='header__realone__search'>
                <a className='btn btn-light btn-sm langbtn' id='header_realone_btns' onClick={HandleSearch}>
                        <img src={search} alt='favorites_icon' className='header__icons'/>
                        Search
                    </a>
                    {user?.result.name?
                    <div className="dropdown show">
                    <a style={{display: 'flex', alignItems: 'center', gap: '5px'}} className='btn btn-light btn-sm langbtn' href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img id='user_profile' src={user?.result.photo} alt='user_profile'/>
                     Mahmoud <i class="fas fa-chevron-down"></i>
                    </a>
                   <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                   <a className='btn btn-light btn-sm langbtn' style={{color: '#1d1d1f', width: '100%', textAlign: 'left', cursor: 'pointer'}} onClick={()=>openLink('/user')}>
                    <img className='header__icons' src={dashboard} alt='user_profile'/>
                    Profile
                   </a>
                   <a className='btn btn-light btn-sm langbtn' style={{color: '#1d1d1f', width: '100%', textAlign: 'left', cursor: 'pointer'}} onClick={()=>openLink('/liked')}>
                        <img src={favorites} alt='favorites_icon' className='header__icons'/>
                        Favorites<span class="badge bg-danger ms-2">{userWeNeed[0]?.liked.length}</span>
                    </a>
                    <a className='btn btn-light btn-sm langbtn' style={{color: '#1d1d1f', width: '100%', textAlign: 'left', cursor: 'pointer'}} onClick={()=>openLink('/cart')}>
                        <img src={cart} alt='favorites_icon' className='header__icons'/>
                        Cart<span class="badge bg-danger ms-2">{userWeNeed[0]?.cart.length}</span>
                    </a>
                    <a className='btn btn-light btn-sm langbtn' style={{color: '#1d1d1f', width: '100%', textAlign: 'left', cursor: 'pointer'}} onClick={()=>openLink('/orders')}>
                        <img src={orders} alt='favorites_icon' className='header__icons'/>
                        Orders<span class="badge bg-danger ms-2">{countOfWaitngOrders?.length}</span>
                    </a>
                    {user?.result.userStatus=='admin'? 
                    <a className='btn btn-light btn-sm langbtn' style={{color: '#1d1d1f', width: '100%', textAlign: 'left', cursor: 'pointer'}} onClick={()=>openLink('/cpa')}>
                    <img src={cpa} alt='favorites_icon' className='header__icons'/>
                    Control Panel
                </a> : null
                }
                <a className='btn btn-light btn-sm langbtn' style={{color: '#1d1d1f', width: '100%', textAlign: 'left'}} onClick={logOut}>
                        <img src={logout} alt='favorites_icon' className='header__icons'/>
                        Log Out
                    </a>
                    
                   </div>
                </div> :
                    <a className='btn btn-light btn-sm langbtn' style={{cursor: 'pointer'}} id='header__firstone__user' onClick={()=>openLink('/login')}>
                    <img id='user_profile' src={userLogo} alt='user_profile'/>
                    Sign In | Sign Up
                </a> }
                    <a className='btn btn-light btn-sm langbtn' style={{cursor: 'pointer'}} id='header_realone_btns' onClick={()=>openLink('/who')}>
                        <img src={who} alt='favorites_icon' className='header__icons'/>
                        Who We Are?
                    </a>
                    <a className='btn btn-light btn-sm langbtn' style={{cursor: 'pointer'}} id='header_realone_btns' onClick={()=>openLink('/sell')}>
                        <img src={sell} alt='favorites_icon' className='header__icons'/>
                        Sell With Us
                    </a>
                </div>
                </div>
              <ul id="header__navbar">
                <li><div className="dropdown show">
                    <a className="btn btn-link dropdown-toggle nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     Sections
                    </a>
                   <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                   <a className="dropdown-item subnav-link" style={{cursor: 'pointer'}} onClick={()=> openPost('formen')}>For Men</a>
                   <a className="dropdown-item subnav-link" style={{cursor: 'pointer'}} onClick={()=> openPost('forwomen')}>For Women</a>
                   <a className="dropdown-item subnav-link" style={{cursor: 'pointer'}} onClick={()=> openPost('forkids')}>For Kids</a>
                   <a className="dropdown-item subnav-link" style={{cursor: 'pointer'}} onClick={()=> openPost('forallgenders')} target="_self">All</a>
                   </div>
                </div></li>
                  <li className='dis'><a className="nav-link" href="/#new_products" target="_self"><i className="fas fa-truck"></i> New Products</a></li>
                  <li className='dis'><a className="nav-link" href="/#offers" target="_self"><i className="fas fa-cart-plus"></i> Special Offers</a></li>
                  <li className='dis'><a className="nav-link" href="/#best_sell" target="_self"><i className="fas fa-fire"></i> Best Seller</a></li>
                </ul>

            </div>
            <SearchModal
            show={show}
            onHide={() => setShow(false)}
            />
        </div>
    )
  
}
export default Header