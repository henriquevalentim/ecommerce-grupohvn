import React, { useEffect, useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Link
} from '@mui/material'
import api from '../../../../../utils/api'
import { formatDateToStringDateBr } from '../../../../../utils/helperDate'
import { formatPrice, limitText } from '../../../../../utils/functions'

const paymentMethods = {
  credit_card: 'Cartão de Crédito',
  boletobancario: 'Boleto Bancário',
  link_payment: 'Link de pagamento'
}

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const getOrders = async () => {
      const response = await api.get(`/order/user`)
      setOrders(response.data)
    }

    getOrders()
  }, [])

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
  }

  const handleCloseDetails = () => {
    setSelectedOrder(null)
  }

  const renderDetails = (orderId) => {
    if (!selectedOrder || selectedOrder?._id !== orderId) return null

    return (
      <TableContainer component={Paper}>
        <Table aria-label='Products table'>
          <TableHead>
            <TableRow>
              <TableCell>Nome do Produto</TableCell>
              <TableCell align='right'>Quantidade</TableCell>
              <TableCell align='right'>Preço do Produto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedOrder.products.map((product) => (
              <TableRow key={product.id}>
                <Tooltip title={product?.name}>
                  <TableCell component='th' scope='row'>
                    {limitText(product.name, 40)}
                  </TableCell>
                </Tooltip>
                <TableCell align='right'>{product.quantity}</TableCell>
                <TableCell align='right'>R$ {product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CardActions>
          <Button onClick={handleCloseDetails} size='small'>
            esconder detalhes
          </Button>
        </CardActions>
      </TableContainer>
    )
  }

  return (
    <>
      {orders.map((order) => (
        <Card key={order.id} style={{ minWidth: '800px', margin: '10px auto' }}>
          <CardContent>
            <Typography variant='h5' component='h2'>
              Data de Compra: {formatDateToStringDateBr(order.registerDate)}
            </Typography>
            <Typography color='textSecondary' gutterBottom>
              Status: {order.status}
            </Typography>
            <Typography color='textSecondary' gutterBottom>
              Valor do Pedido: {formatPrice(order.total)}
            </Typography>
            <Typography color='textSecondary' gutterBottom>
              Método de pagamento: {paymentMethods[order.paymentMethod]}
            </Typography>
            {(order.paymentMethod === 'link_payment' ||
              order.paymentMethod === 'boletobancario') && (
              <Typography color='textSecondary' gutterBottom>
                Link:{' '}
                <Link
                  href={
                    order?.metadata?.find(
                      (meta) =>
                        meta.key === 'boleto_url' || meta.key === 'paymentLink'
                    )?.value
                  }
                  target='_blank'
                >
                  clique aqui
                </Link>
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button size='small' onClick={() => handleViewDetails(order)}>
              Ver detalhes da compra
            </Button>
          </CardActions>
          {renderDetails(order._id)}
        </Card>
      ))}
    </>
  )
}

export default Orders
