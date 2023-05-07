import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography
} from '@mui/material'

import CreditCardIcon from '@mui/icons-material/CreditCard'
import DescriptionIcon from '@mui/icons-material/Description'
import PixIcon from '@mui/icons-material/Pix'
import PrintIcon from '@mui/icons-material/Print'
import ComputerIcon from '@mui/icons-material/Computer'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useState } from 'react'
import Cards from 'react-credit-cards'

import InputText from '../../components/basicComponents/InputText'
import api from '../../utils/api'

import InputMask from '../basicComponents/InputMask'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

export default function StepSelectPayment({
  activeStep,
  handleNext,
  handleBack,
  steps
}) {
  const [value, setValue] = useState(0)
  const [cvc, setCvc] = useState('')
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [focus, setFocus] = useState('number')
  const [expiry, setExpiry] = useState('')
  const [installments, setInstallments] = useState(1)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handlePaymentCreditCard = async () => {
    const body = localStorage.getItem('body')
    const bodyParse = JSON.parse(body)
    const data = {
      products: bodyParse.products.map((item) => ({
        code: item.code,
        quantity: item.quantity
      })),
      address: bodyParse.address,
      payment: {
        installments,
        card: {
          cvc,
          number: number.replace(' ', ''),
          name,
          expiry
        },
        paymentMethod: 'credit_card'
      }
    }
    const reponse = await api.post('/order/process', data)
    console.log(reponse)

    handleNext()
  }

  const handlePaymentInvoice = async () => {
    const body = localStorage.getItem('body')
    const bodyParse = JSON.parse(body)
    const data = {
      products: bodyParse.products.map((item) => ({
        code: item.code,
        quantity: item.quantity
      })),
      address: bodyParse.address,
      payment: {
        paymentMethod: 'boletobancario'
      }
    }
    const reponse = await api.post('/order/process', data)
    console.log(reponse)

    handleNext()
  }

  return (
    <div style={{ marginTop: 40 }}>
      <Typography component='div' variant='h5'>
        Escolha sua forma de pagamento
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='icon label tabs example'
      >
        <Tab
          icon={<CreditCardIcon />}
          label='Cartão de Crédito'
          {...a11yProps(0)}
        />
        <Tab icon={<DescriptionIcon />} label='Boleto' {...a11yProps(1)} />
        <Tab icon={<PixIcon />} label='PIX' {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item xs>
            <Typography component='div' variant='h6'>
              Digite os dados do cartão
            </Typography>
            <Grid
              md={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Grid md={4}>
                <Cards
                  cvc={cvc}
                  expiry={expiry}
                  focused={focus}
                  name={name}
                  number={number}
                  locale={{ valid: 'validade' }}
                  placeholders={{ name: 'Seu nome aqui' }}
                />
              </Grid>
              <Grid md={4}>
                <InputMask
                  style={{ marginBottom: 10 }}
                  label='Número do cartão'
                  placeholder='4444 4444 4444 4444'
                  mask='9999 9999 9999 9999'
                  setValue={setNumber}
                  onFocus={() => setFocus('number')}
                  value={number}
                />

                <InputText
                  style={{ marginBottom: 10 }}
                  label='Nome impresso no cartão'
                  placeholder='John Smith'
                  setValue={setName}
                  onFocus={() => setFocus('name')}
                  value={name}
                />
                <InputMask
                  style={{ marginBottom: 10 }}
                  label='Validate'
                  placeholder='10/2030'
                  mask='99/9999'
                  setValue={setExpiry}
                  onFocus={() => setFocus('expiry')}
                  value={expiry}
                />
                <InputText
                  style={{ marginBottom: 10 }}
                  label='CVC'
                  placeholder='123'
                  setValue={setCvc}
                  onFocus={() => setFocus('cvc')}
                  value={cvc}
                />

                <FormControl fullWidth>
                  <InputLabel id='simple-select-label'>
                    número de parcelas
                  </InputLabel>
                  <Select
                    labelId='simple-select-label'
                    id='demo-simple-select-required'
                    value={installments}
                    label='número de parcelas'
                    onChange={(e) => setInstallments(e.target.value)}
                  >
                    <MenuItem value={1}>1x</MenuItem>
                    <MenuItem value={2}>2x</MenuItem>
                    <MenuItem value={3}>3x</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div>
          <Button
            color='inherit'
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Voltar
          </Button>
          <Button onClick={handlePaymentCreditCard}>
            {activeStep === steps.length - 1 ? 'Pagar' : 'Próximo'}
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <p style={{ display: 'flex' }}>
              <PrintIcon /> imprima o boleto e pague no banco
            </p>

            <p style={{ display: 'flex' }}>
              <ComputerIcon /> ou pague pela internet utilizando o código de
              barras do boleto
            </p>

            <p style={{ display: 'flex' }}>
              <CalendarTodayIcon /> o prazo de validade do boleto é de 1 dia
              util
            </p>
          </div>
        </Grid>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 30
          }}
        >
          <Button variant='contained' onClick={handlePaymentInvoice}>
            Fechar pedido
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        PIXeeeeezãooooooooo
      </TabPanel>
    </div>
  )
}
