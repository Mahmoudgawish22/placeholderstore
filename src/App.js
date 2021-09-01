import './App.css';
import Header from '../src/components/header/header'
import Homepage from './components/pages/homepage/homepage';
import Footer from './components/footer/footer';
import SignLogin from './components/pages/loginsignpage/logSign';
import Cart from './components/pages/cartpage/cart';
import Liked from './components/pages/likedpage/liked';
import Orders from './components/pages/orderspage/orders';
import User from './components/pages/userpage/user';
import Sellw from './components/pages/sellWUpage/sellw';
import Terms from './components/pages/terms/terms';
import Who from './components/pages/whoweRpage/who';
import Product from './components/pages/productpage/product';
import Products from './components/pages/productspage/products';
import Admin from './components/pages/adminpage/admin';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {getUsers} from './actions/users'
import {getTypes} from './actions/types'
import {getSells} from './actions/sells'
import {getReviews} from './actions/reviews'
import {getReturns} from './actions/returns'
import {getProducts} from './actions/products'
import {getOrders} from './actions/orders'
import {getOffersImg} from './actions/offersImg'
import {getOffers} from './actions/offers'
import {getNews} from './actions/news'
import {getCompanies} from './actions/companies'




function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getUsers());
    dispatch(getTypes());
    dispatch(getSells());
    dispatch(getReviews());
    dispatch(getReturns());
    dispatch(getProducts());
    dispatch(getOrders());
    dispatch(getOffersImg());
    dispatch(getOffers());
    dispatch(getNews());
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/login" component={SignLogin} />
        <Route path="/cart" component={Cart} />
        <Route path="/liked" component={Liked} />
        <Route path="/orders" component={Orders} />
        <Route path="/user" component={User} />
        <Route path="/sell" component={Sellw} />
        <Route path="/terms" component={Terms} />
        <Route path="/who" component={Who} />
        <Route path="/product/:id" component={Product} />
        <Route path="/products/:id" component={Products} />
        <Route path="/cpa" component={Admin} />
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
