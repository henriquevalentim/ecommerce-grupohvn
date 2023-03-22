import React from 'react'
import Header from '../../components/Header'
import PropTypes from 'prop-types'
import { Typography, Tabs, Box, Container } from '@mui/material'
import UpdateUserData from './tabs/updateUserData'
import Address from './tabs/address'
import {
  CardGiftcard,
  Payment,
  Person,
  Place,
  ShoppingBasket
} from '@mui/icons-material'
import { Tab } from './styles'
import { GREY_FAINT } from '../../utils/constants'

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
    <div style={{ backgroundColor: GREY_FAINT }}>
      <Header />
      <Container
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex'
        }}
      >
        <Box
          sx={{
            marginTop: 3,
            width: 300,
            height: '30%'
          }}
        >
          <Tabs
            orientation='vertical'
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                display: 'none'
              }
            }}
          >
            <Tab
              label='pedido'
              icon={<ShoppingBasket />}
              iconPosition='start'
              {...selectTab(0)}
            />
            <Tab
              label='cadastro'
              icon={<Person />}
              iconPosition='start'
              {...selectTab(1)}
            />
            <Tab
              label='endereço'
              icon={<Place />}
              iconPosition='start'
              {...selectTab(2)}
            />
            <Tab
              label='cartão'
              icon={<Payment />}
              iconPosition='start'
              {...selectTab(3)}
            />
            <Tab
              label='Cupom'
              icon={<CardGiftcard />}
              iconPosition='start'
              {...selectTab(4)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Lista de pedidos
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UpdateUserData />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Address />
        </TabPanel>
        <TabPanel value={value} index={3}>
          Cartãooooooooooooooo
        </TabPanel>
        <TabPanel value={value} index={4}>
          Cupommmmm
        </TabPanel>
      </Container>
    </div>
  )
}
