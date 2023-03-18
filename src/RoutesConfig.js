import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './screens/login'
import SignUp from './screens/signUp'
import Home from './screens/home'
import NotFound from './screens/notFound'
import Logout from './screens/logout'
import Account from './screens/account'

export default function RoutesConfig() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/cadastrar' element={<SignUp />} />
        <Route exact path='/logout' element={<Logout />} />

        <Route exact path='/profile' element={<Account />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
