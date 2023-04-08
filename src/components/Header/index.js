import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AccountMenu from '../AccountMenu'

export default function Header() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const redirectLogin = () => {
    navigate('/login')
  }

  const redirectCart = () => {
    navigate('/cart')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/home')}
          >
            Grupo HVN
          </Typography>
          <ShoppingCartIcon
            style={{ fontSize: 30, cursor: 'pointer' }}
            onClick={redirectCart}
          />

          {isAuthenticated ? (
            <AccountMenu />
          ) : (
            <Button color='inherit' onClick={redirectLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
