import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './screens/login'
import SignUp from './screens/signUp'
import Home from './screens/home'
import NotFound from './screens/notFound'

export default function RoutesConfig() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/cadastrar' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
