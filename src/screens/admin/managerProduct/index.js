import { useEffect, useState } from 'react'
import { Delete } from '@mui/icons-material'
import {
  Button,
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
import { useNavigate } from 'react-router-dom'

import SidebarAdmin from '../../../components/SidebarAdmin'
import api from '../../../utils/api'
import { formatDateToStringDateBr } from '../../../utils/helperDate'
import Loading from '../../../components/basicComponents/Loading'
import { handleConfirmDelete } from '../../../components/basicComponents/ConfirmDelete'

export default function ManagerProduct() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await api.get('/product')
      setProducts(response.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleDelete = async (idProduct) => {
    try {
      setLoading(true)
      await api.delete(`/product/${idProduct}`)

      const response = await api.get('/product')
      setProducts(response.data)
    } catch (error) {
      console.log(error)
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
          <div
            style={{
              marginBottom: '48px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='h4' fontWeight={600}>
              Administrar produtos
            </Typography>
            <Button
              variant='contained'
              onClick={() => navigate('/admin/formProduct')}
            >
              Cadastrar Produto
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Nome</TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Código
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Preço
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Quantidade
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Tipo
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Ativo
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Data de registro
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow
                      key={product._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {product.name}
                      </TableCell>
                      <TableCell align='right'>{product.code}</TableCell>
                      <TableCell align='right'>{product.price}</TableCell>
                      <TableCell align='right'>{product.quantity}</TableCell>
                      <TableCell align='right'>{product.type}</TableCell>
                      <TableCell align='right'>
                        {product.status ? 'SIM' : 'Não'}
                      </TableCell>
                      <TableCell align='right'>
                        {formatDateToStringDateBr(product.registerDate)}
                      </TableCell>
                      <TableCell align='right'>
                        <Tooltip title='Excluir Produto'>
                          <Delete
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleConfirmDelete({
                                callback: () => handleDelete(product._id)
                              })
                            }
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
            count={products.length}
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
