import { useState, useEffect } from 'react'
import {
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip
} from '@mui/material'
import { toast } from 'react-toastify'
import { Delete } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

import SidebarAdmin from '../../../components/SidebarAdmin'
import api from '../../../utils/api'
import Loading from '../../../components/basicComponents/Loading'

import InputText from '../../../components/basicComponents/InputText'

export default function FormSetting() {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [metadatas, setMetadatas] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (state) {
      const { setting = '' } = state
      setId(setting._id)
      setName(setting.name)
      setCode(setting.code)
      setDescription(setting.description)
      setType(setting.type)
      setMetadatas(setting.metadatas)
    }
  }, [state])

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const body = {
        name,
        code,
        description,
        type,
        metadatas
      }

      if (id) {
        await api.put(`/setting/${id}`, body)
      } else {
        await api.post('/setting/', body)
      }

      navigate('/admin/manageSetting')
    } catch (error) {
      toast(error.response.data.message, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const clearKeyAndValue = () => {
    setKey('')
    setValue('')
  }

  const handleDelete = async (metadata) => {
    try {
      const newMetadatas = metadatas.filter(
        (item) => item.key !== metadata.key && item.value !== metadata.value
      )
      setMetadatas(newMetadatas)
    } catch (error) {
      console.log(error)
    }
  }

  const addMetadata = async () => {
    try {
      setMetadatas([...metadatas, { key, value }])
      clearKeyAndValue()
    } catch (error) {
      toast(error.response.data.message, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <Loading loading={loading} />
      <SidebarAdmin />
      <main>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
          <div
            style={{
              marginBottom: '48px'
            }}
          >
            <Typography variant='h4' fontWeight={600}>
              Cadastrar Configuração
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputText
                label='Nome'
                placeholder='Configuração'
                setValue={setName}
                value={name}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Código'
                placeholder='SETTING_398'
                setValue={setCode}
                value={code}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Tipo'
                placeholder='SETTING_TEST'
                setValue={setType}
                value={type}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                label='Descrição'
                placeholder='Configuração utilizada para...'
                setValue={setDescription}
                value={description}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 5 }}>
              <Typography variant='h5' fontWeight={600}>
                Informações adicionais
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Chave'
                placeholder='Marca'
                setValue={setKey}
                value={key}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Valor'
                placeholder='Samsung'
                setValue={setValue}
                value={value}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant='contained'
                sx={{ height: 55 }}
                onClick={() => addMetadata()}
              >
                Adicionar
              </Button>
            </Grid>
          </Grid>
          {metadatas.length > 0 && (
            <TableContainer sx={{ width: 500, marginTop: 3 }} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Chave</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Valor</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metadatas.map((row) => (
                    <TableRow
                      key={row.value}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.key}
                      </TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell align='right'>
                        <Tooltip title='Excluir Metadata'>
                          <Delete
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleDelete({ key: row.key, value: row.value })
                            }
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Grid xs={8} style={{ marginTop: 20 }}>
            <Button
              variant='contained'
              sx={{ mr: 3 }}
              onClick={() => handleSubmit()}
            >
              Cadastrar Configuração
            </Button>

            <Button
              variant='outlined'
              onClick={() => navigate('/admin/manageSetting')}
            >
              Voltar
            </Button>
          </Grid>
        </div>
      </main>
    </div>
  )
}
