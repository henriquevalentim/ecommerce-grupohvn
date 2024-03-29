import { useEffect, useState } from 'react'
import { Delete, Upgrade, Person } from '@mui/icons-material'
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
import { useNavigate } from 'react-router-dom'

import SidebarAdmin from '../../../components/SidebarAdmin'
import api from '../../../utils/api'
import { formatDateToStringDateBr } from '../../../utils/helperDate'
import Loading from '../../../components/basicComponents/Loading'
import { handleConfirmDelete } from '../../../components/basicComponents/ConfirmDelete'
import { toast } from 'react-toastify'
import InputText from '../../../components/basicComponents/InputText'

export default function ManagerOrder() {
  const [users, setUsers] = useState([])
  const [usersFiltered, setUsersFiltered] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [term, setTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (term) {
      const filtered = users.filter((user) => {
        return (
          user.name.toLowerCase().includes(term.toLowerCase()) ||
          user.cpf.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase())
        )
      })
      setUsersFiltered(filtered)
    } else {
      setUsersFiltered(users)
    }
  }, [term, users])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await api.get('/user')
      setUsers(response.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const goToProfileUser = async (user) => {
    try {
      navigate('/admin/profileUser', { state: { user } })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

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

  const handleSetAdminInUser = async (idUser) => {
    try {
      setLoading(true)
      await api.post(`/user/setAdminInUser/${idUser}`)

      const response = await api.get('/user')
      setUsers(response.data)
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
              Administrar usuários
            </Typography>
          </div>
          <InputText
            style={{ marginBottom: '24px' }}
            label='Filtro'
            placeholder='Henrique Valentim'
            setValue={setTerm}
            value={term}
          />
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
                    Admin
                  </TableCell>
                  <TableCell align='right' style={{ fontWeight: 'bold' }}>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow
                      key={user._id}
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
                        {user?.permission?.includes('ADMIN') ? 'Sim' : 'Não'}
                      </TableCell>
                      <TableCell align='right'>
                        <Tooltip title='Mostrar mais detalhes'>
                          <Person
                            style={{ cursor: 'pointer' }}
                            onClick={() => goToProfileUser(user)}
                          />
                        </Tooltip>
                        <Tooltip title='Tornar administrador'>
                          <Upgrade
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSetAdminInUser(user._id)}
                          />
                        </Tooltip>
                        <Tooltip title='Excluir Usuário'>
                          <Delete
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleConfirmDelete({
                                callback: () => handleDelete(user._id)
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
