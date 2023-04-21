import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { useEffect } from 'react'
import api from '../../utils/api'
import { useState } from 'react'
import { formatPrice } from '../../utils/functions'

export default function StepSelectAddress() {
  const [mainAddress, setMainAddress] = useState()
  const [frete, setFrete] = useState()
  const [selectedFrete, setSelectedFrete] = useState(0)
  const [totalPriceProduct, setTotalPriceProduct] = useState(0)
  const [quantityProducts, setQuantityProducts] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const addressUser = await api.get('/address/default')
      if (addressUser) {
        setMainAddress(addressUser.data)
        let freteAddress = await api.get(`/frete/${addressUser?.data?.zipCode}`)
        if (freteAddress) {
          setFrete(freteAddress.data)
          if (typeof freteAddress.data.pac.valor === 'string')
            freteAddress.data.pac.valor = Number(
              freteAddress.data.pac.valor.replace(',', '.')
            )
          setSelectedFrete({ ...freteAddress.data.pac, sendMethod: 'PAC' })
        }
      }
    }
    const getDataLocalStorage = async () => {
      const body = localStorage.getItem('body')
      if (!body) return

      const bodyParse = JSON.parse(body)
      let total = 0
      let quantity = 0
      bodyParse.products.forEach((product) => {
        total += product.quantity * product.price
        quantity += product.quantity
      })
      setTotalPriceProduct(total)
      setQuantityProducts(quantity)
    }
    fetchData()
    getDataLocalStorage()
  }, [])

  useEffect(() => {
    setAddressInLocalStorage()
  }, [mainAddress, selectedFrete])

  const selectFrete = (itemFrete) => {
    if (typeof itemFrete.valor === 'string') {
      itemFrete.valor = Number(itemFrete.valor.replace(',', '.'))
    }
    setSelectedFrete(itemFrete)
    setAddressInLocalStorage()
  }

  const setAddressInLocalStorage = () => {
    let body = localStorage.getItem('body')
    if (body) {
      body = JSON.parse(body)
      body.address = {
        id: mainAddress?._id,
        totalFrete: selectedFrete.valor,
        sendMethod: selectedFrete.sendMethod
      }

      localStorage.setItem('body', JSON.stringify(body))
    }
  }

  if (!mainAddress) return null

  return (
    <div style={{ marginTop: 40 }}>
      <Grid container>
        <Grid item xs>
          <Typography component='div' variant='h6'>
            endereço de entrega
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {mainAddress?.name}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {mainAddress?.street}, {mainAddress?.number}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {mainAddress?.neighborhood}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {mainAddress?.city}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {mainAddress?.state}
          </Typography>
          <Button variant='text'>alterar o endereço</Button>
        </Grid>
        <Divider orientation='vertical' flexItem />

        <Grid item xs style={{ marginLeft: 20 }}>
          <Typography component='div' variant='h6'>
            resumo da compra
          </Typography>
          <ul style={{ margin: 0, padding: 0 }}>
            <li
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: 0
              }}
            >
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                {quantityProducts} produto
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                {formatPrice(totalPriceProduct)}
              </Typography>
            </li>
            <li
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: 0
              }}
            >
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                frete
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                {formatPrice(selectedFrete?.valor)}
              </Typography>
            </li>
            <Divider />
            <li
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: 0
              }}
            >
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                Total
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                {formatPrice(totalPriceProduct + selectedFrete?.valor)}
              </Typography>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 10 }} />

      <Grid container>
        <Grid item xs>
          <Typography component='div' variant='h6'>
            opções de entrega
          </Typography>

          {frete && (
            <>
              <FormControl>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='PAC'
                  name='radio-buttons-group'
                >
                  <FormControlLabel
                    value='PAC'
                    control={<Radio />}
                    label={`PAC: R$ ${frete?.pac?.valor} - ${frete?.pac?.prazo} dias`}
                    onClick={() =>
                      selectFrete({ ...frete?.pac, sendMethod: 'PAC' })
                    }
                  />
                  <FormControlLabel
                    value='SEDEX'
                    control={<Radio />}
                    label={`SEDEX: R$ ${frete?.sedex?.valor} - ${frete?.sedex?.prazo} dias`}
                    onClick={() =>
                      selectFrete({ ...frete?.sedex, sendMethod: 'SEDEX' })
                    }
                  />
                </RadioGroup>
              </FormControl>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  )
}
