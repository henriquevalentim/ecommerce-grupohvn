import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-toastify/dist/ReactToastify.css'
import RoutesConfig from './RoutesConfig'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <RoutesConfig />
    <ToastContainer />
  </>
)
