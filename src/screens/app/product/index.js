import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Header from '../../../components/Header'
import api from '../../../utils/api'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography
} from '@mui/material'
import { GREY_FAINT } from '../../../utils/constants'
import { formatPrice } from '../../../utils/functions'
import StarRating from '../../../components/StarRating'
import InputMask from '../../../components/basicComponents/InputMask'
import Loading from '../../../components/basicComponents/Loading'

export default function Home() {
  const { id } = useParams()
  const [product, setProduct] = useState()
  const [cep, setCep] = useState('')
  const [frete, setFrete] = useState()
  const [loadingFrete, setLoadingFrete] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function getProduct() {
      setLoading(true)
      const response = await api.get(`/product/${id}`)
      setProduct(response.data)
      setLoading(false)
    }
    async function getDefaultAddress() {
      const res = await api.get('/address/default')
      setCep(res?.data?.zipCode)
    }
    getDefaultAddress()
    getProduct()
  }, [])

  useEffect(() => {
    const getDefaultAddress = async () => {
      try {
        if (cep.length === 8) {
          setLoadingFrete(true)

          const response = await api.get(`/frete/${cep}`)
          setFrete(response.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingFrete(false)
      }
    }
    getDefaultAddress()
  }, [cep])

  const calcFrere = async () => {
    try {
      const response = await api.get(`/frete/${cep}`)
      setFrete(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const setProductInLocalStorage = async (codeProduct) => {
    try {
      const productsCode = localStorage.getItem('cart')
      if (!productsCode) {
        localStorage.setItem('cart', JSON.stringify([codeProduct]))
      } else {
        const products = JSON.parse(productsCode)
        localStorage.setItem('cart', JSON.stringify([...products, codeProduct]))
      }
      navigate('/cart')
      return
    } catch (error) {
      console.log(error)
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
            alignItems: 'center',
            maxWidth: 800,
            maxHeight: 600,
            marginTop: 10
          }}
        >
          <img
            src={product?.urlImage}
            style={{ width: 450, height: 450 }}
            alt='Live from space album cover'
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component='div' variant='h5'>
                {product?.name}
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                {product?.code}
              </Typography>
              <StarRating />
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                Computadores EasyPC go!, alto desempenho ao seu alcance Os PCs
                go! foram desenvolvidos para você que necessita de alto poder de
                processamento para executar as suas multitarefas diariamente.
                Desenvolvidos com processador Intel da fam...
              </Typography>
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                cor: preto
              </Typography>
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                voltagem: bivolt
              </Typography>
            </CardContent>
          </Box>
        </Card>
        <Card
          sx={{ maxWidth: 400, maxHeight: 600, marginTop: 10, marginLeft: 1 }}
        >
          <CardContent>
            <Typography variant='h5' component='div'>
              {formatPrice(product?.price)}
            </Typography>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <div style={{ display: 'flex' }}>
              <InputMask
                style={{ marginRight: 10 }}
                label='calcular frete e prazo'
                placeholder='08750-000'
                setValue={setCep}
                value={cep}
              />

              <Button variant='outlined' onClick={calcFrere}>
                OK
              </Button>
            </div>
            {frete && (
              <>
                <Typography variant='subtitle1' component='div'>
                  SEDEX: R$ {frete?.sedex?.valor} - {frete?.sedex?.prazo} dias
                </Typography>
                <Typography variant='subtitle1' component='div'>
                  PAC: R$ {frete?.pac?.valor} - {frete?.pac?.prazo} dias
                </Typography>
              </>
            )}

            <Loading loading={loading} />
            <Loading loading={loadingFrete} centerScreen={false} />
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <Button
              variant='contained'
              onClick={() => setProductInLocalStorage(product.code)}
            >
              Adicionar ao carrinho
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
