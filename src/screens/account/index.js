import React from 'react'
import Header from '../../components/Header'
import PropTypes from 'prop-types'
import { Typography, Tab, Tabs, Box } from '@mui/material'
import UpdateUserData from './tabs/updateUserData'
import Address from './tabs/address'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function selectTab(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function Account() {
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Header />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Cadastro' {...selectTab(0)} />
            <Tab label='Pedidos' {...selectTab(1)} />
            <Tab label='Endereço' {...selectTab(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UpdateUserData />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Lista de pedidos
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Address />
        </TabPanel>
      </Box>
    </>
  )
}
