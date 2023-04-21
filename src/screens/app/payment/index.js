import {
  Box,
  Button,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper
} from '@mui/material'
import Header from '../../../components/Header'
import { GREY_FAINT } from '../../../utils/constants'
import { useEffect, useState } from 'react'
import api from '../../../utils/api'
import ThankYou from '../../../components/ThankYou'
import StepSelectAddress from '../../../components/StepSelectAddress'

const steps = [
  'Selecione o endereço',
  'Informe o metodo de pagamento',
  'Resumo'
]

export default function Payment() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())

  useEffect(() => {
    const getProducts = async () => {
      const productsLocalStorage = localStorage.getItem('cart')
      if (productsLocalStorage) {
        let total = 0
        const product = JSON.parse(productsLocalStorage)
        const response = await api.post('/product/codes', { codes: product })
        const newCart = response.data.map((item) => {
          item.quantity = 1
          return item
        })
        newCart.forEach((item) => {
          total += item.price * item.quantity
        })
        setTotal(total)
        setCart(newCart)
      }
    }
    getProducts()
  }, [])

  const isStepOptional = (step) => {
    return step === 1
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const renderStep = (activeStep) => {
    switch (activeStep) {
      case 0:
        return <StepSelectAddress />
      case 1:
        return <p>step 2</p>
      case 2:
        return <p>step 3</p>
      default:
        return <ThankYou />
    }
  }

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: GREY_FAINT,
          height: '100vh',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Card
          sx={{
            display: 'flex',
            minWidth: 800,
            maxHeight: 600,
            marginTop: 10
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {}
                  const labelProps = {}
                  if (isStepSkipped(index)) {
                    stepProps.completed = false
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
              {renderStep(activeStep)}
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </CardContent>
          </Box>
        </Card>
      </div>
    </>
  )
}
