import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { useState } from 'react'
import Cards from 'react-credit-cards'

import InputText from '../../components/basicComponents/InputText'
import api from '../../utils/api'

import InputMask from '../basicComponents/InputMask'

export default function StepSelectPayment({
  activeStep,
  handleNext,
  handleBack,
  steps
}) {
  const [cvc, setCvc] = useState('')
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [focus, setFocus] = useState('number')
  const [expiry, setExpiry] = useState('')
  const [installments, setInstallments] = useState(1)

  const handlePayment = async () => {
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
          number,
          name,
          expiry
        },
        paymentMethod: 'credit_card'
      }
    }
    // const reponse = await api.post('/payment', {})
    console.log(data)

    handleNext()
  }

  return (
    <div style={{ marginTop: 40 }}>
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
        <Button onClick={handlePayment}>
          {activeStep === steps.length - 1 ? 'Pagar' : 'Próximo'}
        </Button>
      </div>
    </div>
  )
}
