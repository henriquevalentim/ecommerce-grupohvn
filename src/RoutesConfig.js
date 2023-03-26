import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './screens/app/login'
import SignUp from './screens/app/signUp'
import Home from './screens/app/home'
import NotFound from './screens/app/notFound'
import Logout from './screens/app/logout'
import Account from './screens/app/account'
import HomeAdmin from './screens/admin/home'
import ManagerUser from './screens/admin/managerUser'
import ManagerProduct from './screens/admin/managerProduct'
import Product from './screens/admin/product'

export default function RoutesConfig() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/cadastrar' element={<SignUp />} />
        <Route exact path='/logout' element={<Logout />} />

        <Route exact path='/profile' element={<Account />} />
        <Route exact path='/admin/' element={<HomeAdmin />} />
        <Route exact path='/admin/home' element={<HomeAdmin />} />
        <Route exact path='/admin/managerUser' element={<ManagerUser />} />
        <Route exact path='/admin/manageProduct' element={<ManagerProduct />} />
        <Route exact path='/admin/formProduct' element={<Product />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
