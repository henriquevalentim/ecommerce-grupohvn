import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './screens/app/login'
import SignUp from './screens/app/signUp'
import Home from './screens/app/home'
import NotFound from './screens/app/notFound'
import Logout from './screens/app/logout'
import Account from './screens/app/account'
import Product from './screens/app/product'
import HomeAdmin from './screens/admin/home'
import ManagerUser from './screens/admin/managerUser'
import ManagerProduct from './screens/admin/managerProduct'
import ManageSetting from './screens/admin/manageSetting'
import ManageOrder from './screens/admin/managerOrder'
import FormProduct from './screens/admin/formProduct'
import FormSetting from './screens/admin/formSetting'
import Cart from './screens/app/cart'
import Payment from './screens/app/payment'
import ProfileUser from './screens/admin/profileUser'

export default function RoutesConfig() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/cadastrar' element={<SignUp />} />
        <Route exact path='/logout' element={<Logout />} />

        <Route exact path='/profile' element={<Account />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/product/:id' element={<Product />} />
        <Route exact path='/payment' element={<Payment />} />
        <Route exact path='/admin/' element={<HomeAdmin />} />
        <Route exact path='/admin/home' element={<HomeAdmin />} />
        <Route exact path='/admin/manageUser' element={<ManagerUser />} />
        <Route exact path='/admin/manageProduct' element={<ManagerProduct />} />
        <Route exact path='/admin/manageSetting' element={<ManageSetting />} />
        <Route exact path='/admin/manageOrder' element={<ManageOrder />} />
        <Route exact path='/admin/formProduct' element={<FormProduct />} />
        <Route exact path='/admin/formSetting' element={<FormSetting />} />
        <Route exact path='/admin/profileUser' element={<ProfileUser />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
