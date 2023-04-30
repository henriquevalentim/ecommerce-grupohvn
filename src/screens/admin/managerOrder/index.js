import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Edit } from '@mui/icons-material'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'

import SidebarAdmin from '../../../components/SidebarAdmin'
import api from '../../../utils/api'
import { PAYMENT_METHODS } from '../../../utils/constants'
import { formatDateToStringDateBr } from '../../../utils/helperDate'
import { formatPrice } from '../../../utils/functions'
import Loading from '../../../components/basicComponents/Loading'

export default function ManagerOrder() {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await api.get('/order')
      console.log('response.data', response.data)
      setOrders(response.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleSetAdminInUser = async (idUser) => {
    try {
      setLoading(true)
      await api.post(`/user/setAdminInUser/${idUser}`)

      const response = await api.get('/user')
      setOrders(response.data)
    } catch (error) {
      toast(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <div style={{ display: 'flex' }}>
      <Loading loading={loading} />
      <SidebarAdmin />
      <main
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
          <div style={{ marginBottom: '48px' }}>
            <Typography variant='h4' fontWeight={600}>
              Administrar pedidos
            </Typography>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>E-mail</TableCell>
                  <TableCell align='center' style={{ fontWeight: 'bold' }}>
                    Valor
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Método de pagamento
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Data de compra
                  </TableCell>
                  <TableCell align='center' style={{ fontWeight: 'bold' }}>
                    Status
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow
                      key={order._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {order.user.email}
                      </TableCell>
                      <TableCell align='right'>
                        {formatPrice(order.total)}
                      </TableCell>
                      <TableCell align='right'>
                        {PAYMENT_METHODS[order.paymentMethod]}
                      </TableCell>
                      <TableCell align='right'>
                        {formatDateToStringDateBr(order.registerDate)}
                      </TableCell>
                      <TableCell align='right'>{order.status}</TableCell>
                      <TableCell align='right'>
                        <Tooltip title='Editar pedido'>
                          <Edit
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSetAdminInUser(order._id)}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component='div'
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </main>
    </div>
  )
}
