import { useEffect, useState } from 'react'
import { Delete } from '@mui/icons-material'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'

import SidebarAdmin from '../../../components/SidebarAdmin'
import api from '../../../utils/api'
import { formatDateToStringDateBr } from '../../../utils/helperDate'
import Loading from '../../../components/basicComponents/Loading'
import { handleConfirmDelete } from '../../../components/basicComponents/ConfirmDelete'

export default function ManagerUser() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await api.get('/user')
      console.log(response.data)
      setUsers(response.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleDelete = async (idUser) => {
    try {
      setLoading(true)
      await api.delete(`/user/${idUser}`)

      const response = await api.get('/user')
      setUsers(response.data)
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
      <main>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
          <div style={{ marginBottom: '48px' }}>
            <Typography variant='h4' fontWeight={600}>
              Administrar usuários
            </Typography>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Nome</TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    E-mail
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Data de nascimento
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    CPF
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Genero
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
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow
                      key={user.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {user.name}
                      </TableCell>
                      <TableCell align='right'>{user.email}</TableCell>
                      <TableCell align='right'>
                        {formatDateToStringDateBr(user.birthDate)}
                      </TableCell>
                      <TableCell align='right'>{user.cpf}</TableCell>
                      <TableCell align='right'>{user.genre}</TableCell>
                      <TableCell align='right'>
                        {formatDateToStringDateBr(user.registerDate)}
                      </TableCell>
                      <TableCell align='right'>
                        <Delete
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            handleConfirmDelete(() => handleDelete(user._id))
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component='div'
            count={users.length}
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
