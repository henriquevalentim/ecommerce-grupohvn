import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import Header from '../../../components/Header'
import { GREY_FAINT } from '../../../utils/constants'
import { limitText, formatPrice } from '../../../utils/functions'
import { useEffect, useState } from 'react'
import api from '../../../utils/api'

export default function Cart() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()

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

  const calcTotalProducts = () => {
    let total = 0
    cart.forEach((item) => {
      total += item.price * item.quantity
    })
    setTotal(total)
  }

  const redirectToPayment = () => {
    const products = cart.map((item) => {
      return {
        code: item.code,
        quantity: item.quantity,
        price: item.price,
        name: item.name
      }
    })
    localStorage.setItem('body', JSON.stringify({ products }))
    navigate('/payment')
    return
  }

  const addProduct = (product) => {
    const newCart = cart.map((item) => {
      if (item.code === product.code) {
        item.quantity += 1
      }
      return item
    })
    setCart(newCart)
    calcTotalProducts()
  }

  const removeProduct = (product) => {
    const newCart = cart.map((item) => {
      if (item.code === product.code && item.quantity > 1) {
        item.quantity -= 1
      }
      return item
    })
    setCart(newCart)
    calcTotalProducts()
  }

  const excludeProduct = (product) => {
    const newCart = cart.filter((item) => item.code !== product.code)
    setCart(newCart)
    let total = 0
    newCart.forEach((item) => {
      total += item.price * item.quantity
    })
    setTotal(total)
    const codes = newCart.map((item) => item.code)
    localStorage.setItem('cart', JSON.stringify(codes))
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
            maxWidth: 800,
            maxHeight: 500,
            marginTop: 10
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography
                component='div'
                variant='h5'
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                Carrinho de compra
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography style={{ fontWeight: 'bold' }}>
                          produto
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontWeight: 'bold' }}>
                          qtd.
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontWeight: 'bold' }}>
                          preço
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!!cart &&
                      cart.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 }
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            <Typography>{limitText(row.name, 40)}</Typography>
                          </TableCell>
                          <TableCell style={{ paddingLeft: 0 }}>
                            <div
                              style={{
                                display: 'flex',
                                paddingLeft: 0
                              }}
                            >
                              <RemoveIcon
                                onClick={() => removeProduct(row)}
                                style={{ cursor: 'pointer' }}
                              />
                              <Typography>{row.quantity}</Typography>
                              <AddIcon
                                onClick={() => addProduct(row)}
                                style={{ cursor: 'pointer' }}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Typography>
                              {formatPrice(row.quantity * row.price)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <DeleteIcon
                              onClick={() => excludeProduct(row)}
                              style={{ cursor: 'pointer' }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Box>
        </Card>
        <Card
          sx={{ minWidth: 300, maxHeight: 500, marginTop: 10, marginLeft: 1 }}
        >
          <CardContent>
            <Typography
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}
              variant='h5'
              component='div'
            >
              Resumo
            </Typography>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <Typography variant='h5' component='div'>
              Total: {formatPrice(total)}
            </Typography>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <Button variant='contained' onClick={() => redirectToPayment()}>
              Finalizar Pedido
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
