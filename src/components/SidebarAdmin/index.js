import React from 'react'

import {
  menuClasses,
  Sidebar,
  Menu,
  SubMenu,
  MenuItem,
  useProSidebar
} from 'react-pro-sidebar'
import _ from 'lodash'
import { Badge, Typography } from '@mui/material'
import {
  BarChart,
  CalendarMonth,
  Diamond,
  Person,
  RoomService,
  ShoppingCart
} from '@mui/icons-material'
import { SidebarHeader } from '../SidebarHeader'
import { SidebarFooter } from '../SidebarFooter'
import { Link } from 'react-router-dom'

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489'
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e'
      },
      disabled: {
        color: '#9fb6cf'
      }
    }
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7'
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9'
      },
      disabled: {
        color: '#3e5e7e'
      }
    }
  }
}

// hex to rgba converter
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function SidebarAdmin() {
  const { collapseSidebar, collapsed } = useProSidebar()

  const [hasImage] = React.useState(false)
  const [theme] = React.useState('light')

  React.useEffect(() => {
    collapseSidebar()
  }, [collapseSidebar])

  const menuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color
      }
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9'
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : 'transparent'
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color
      },
      '&:hover': {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color
      }
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100%'
      }}
    >
      <Sidebar
        image='https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg'
        breakPoint='lg'
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
          }}
          onMouseEnter={_.debounce(() => collapseSidebar(false), 300)}
          onMouseLeave={_.debounce(() => collapseSidebar(true), 500)}
        >
          <SidebarHeader style={{ marginBottom: '24px', marginTop: '16px' }} />
          <div style={{ flex: 1, marginBottom: '32px' }}>
            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
              <Typography
                variant='body2'
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                General
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <SubMenu
                label='Dashboard'
                icon={<BarChart />}
                suffix={
                  <Badge variant='danger' shape='circle'>
                    6
                  </Badge>
                }
              >
                <MenuItem component={<Link to='/admin/home' />}> Home</MenuItem>
                <MenuItem> Line charts</MenuItem>
                <MenuItem> Bar charts</MenuItem>
              </SubMenu>
              <MenuItem icon={<Person />} component={<Link to='/admin/user' />}>
                Usuários
              </MenuItem>
              <SubMenu label='Theme' icon={<Diamond />}>
                <MenuItem> Dark</MenuItem>
                <MenuItem> Light</MenuItem>
              </SubMenu>
              <SubMenu label='Components' icon={<Diamond />}>
                <MenuItem> Grid</MenuItem>
                <MenuItem> Layout</MenuItem>
                <SubMenu label='Forms'>
                  <MenuItem> Input</MenuItem>
                  <MenuItem> Select</MenuItem>
                  <SubMenu label='More'>
                    <MenuItem> CheckBox</MenuItem>
                    <MenuItem> Radio</MenuItem>
                  </SubMenu>
                </SubMenu>
              </SubMenu>
              <SubMenu label='E-commerce' icon={<ShoppingCart />}>
                <MenuItem> Product</MenuItem>
                <MenuItem> Orders</MenuItem>
                <MenuItem> Credit card</MenuItem>
              </SubMenu>
            </Menu>

            <div
              style={{
                padding: '0 24px',
                marginBottom: '8px',
                marginTop: '32px'
              }}
            >
              <Typography
                variant='body2'
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                Extra
              </Typography>
            </div>

            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                icon={<CalendarMonth />}
                suffix={<Badge variant='success'>New</Badge>}
              >
                Calendar
              </MenuItem>

              <MenuItem disabled icon={<RoomService />}>
                Examples
              </MenuItem>
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>
    </div>
  )
}
