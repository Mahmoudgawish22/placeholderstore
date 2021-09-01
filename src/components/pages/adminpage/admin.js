import React from 'react'
import '../adminpage/admin.css'
import Overal from './overal/overal'
import Adduser from './adduser/adduser';
import AddCompany from './addcompany/AddCompany';
import AddOffer from './addoffer/AddOffer';
import AddProduct from './addproduct/AddProduct';
import AddType from './addtype/AddType';
import EditUsers from './editUsers/EditUsers';
import EditCompanies from './editcompanies/EditCompanies';
import EditProducts from './editproducts/EditProducts';
import EditTypes from './edittypes/EditTypes';
import EditOffers from './editoffers/EditOffers';
import OrderMang from './ordersmang/OrderMang';
import ReturnsMang from './returnsmang/ReturnsMang';
import ArchiveMang from './archivemang/ArchiveMang';
import ODS from './ODS/ODS';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import News from './news/news';

export default function Admin(props) {
    return (
        <div id='admin'>
          <Switch>
            <Route path="/cpa/" component={Overal} exact />
            
            <Route path="/cpa/add-user" component={Adduser} exact />
            <Route path="/cpa/add-company" component={AddCompany} exact />
            <Route path="/cpa/add-offer" component={AddOffer} exact />
            <Route path="/cpa/add-product" component={AddProduct} exact />
            <Route path="/cpa/add-type" component={AddType} exact />
            
            <Route path="/cpa/edit-users" component={EditUsers} exact />
            <Route path="/cpa/edit-companies" component={EditCompanies} exact />
            <Route path="/cpa/edit-products" component={EditProducts} exact />
            <Route path="/cpa/edit-types" component={EditTypes} exact />
            <Route path="/cpa/edit-offers" component={EditOffers} exact />

            <Route path="/cpa/orders-managment" component={OrderMang} exact />
            <Route path="/cpa/returns-managment" component={ReturnsMang} exact />
            <Route path="/cpa/archive-managment" component={ArchiveMang} exact />

            <Route path="/cpa/news-emails" component={News} exact />
            <Route path="/cpa/ods" component={ODS} exact />
          </Switch>
        </div>
    )
}