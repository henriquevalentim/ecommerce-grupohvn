import React, { useState } from 'react';
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
} from '@mui/material';

const orders = [
  {
    id: 1,
    date: '01/04/2023',
    amount: 200,
    status: 'em processamento',
    products: [
      { id: 1, name: 'Produto 1', price: 50 },
      { id: 2, name: 'Produto 2', price: 100 },
      { id: 3, name: 'Produto 3', price: 50 },
    ],
  },
  {
    id: 2,
    date: '03/04/2023',
    amount: 350,
    status: 'entregue',
    products: [
      { id: 1, name: 'Produto 1', price: 50 },
      { id: 2, name: 'Produto 2', price: 100 },
      { id: 3, name: 'Produto 3', price: 50 },
      { id: 4, name: 'Produto 4', price: 150 },
    ],
  },
  {
    id: 3,
    date: '05/04/2023',
    amount: 120,
    status: 'cancelado',
    products: [{ id: 1, name: 'Produto 1', price: 50 }],
  },
];

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const renderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <TableContainer component={Paper}>
        <Table aria-label="Products table">
          <TableHead>
            <TableRow>
              <TableCell>Nome do Produto</TableCell>
              <TableCell align="right">Preço do Produto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedOrder.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">R$ {product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CardActions>
          <Button onClick={handleCloseDetails} size="small">
            Fechar
          </Button>
        </CardActions>
      </TableContainer>
    );
  };

  return (
    <>
      {orders.map((order) => (
        <Card key={order.id} style={{ maxWidth: '600px', margin: '10px auto' }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Número do Pedido: {order.id}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Data de Compra: {order.date}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Valor do Pedido: R$ {order.amount}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Status: {order.status}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleViewDetails(order)}>
              Ver Detalhes
            </Button>
          </CardActions>
        </Card>
      ))}
      {renderDetails()}
    </>
  );
};

export default Orders;
