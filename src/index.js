import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import RoutesConfig from './RoutesConfig'

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.FADE
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <RoutesConfig />
  </AlertProvider>
)
