import { useState } from 'react'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
  MenuItem
} from '@mui/material'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import SidebarAdmin from '../../../components/SidebarAdmin'
import api from '../../../utils/api'
import Loading from '../../../components/basicComponents/Loading'

import InputText from '../../../components/basicComponents/InputText'

export default function FormProduct() {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const [quantity, setQuantity] = useState('')
  const [urlImage, setUrlImage] = useState('')
  const [status, setStatus] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const body = {
        name,
        code,
        price,
        type,
        quantity,
        urlImage,
        status
      }

      await api.post('/product/', body)
      navigate('/admin/manageProduct')
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
              Cadastrar Produto
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputText
                label='Código'
                placeholder='PRODUCT_398'
                setValue={setCode}
                value={code}
              />
            </Grid>
            <Grid item xs={8}>
              <InputText
                label='Nome'
                placeholder='Computador'
                setValue={setName}
                value={name}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Preço'
                placeholder='R$ 458,32'
                setValue={setPrice}
                value={price}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Tipo'
                placeholder='PC'
                setValue={setType}
                value={type}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Quantidade'
                placeholder='100'
                setValue={setQuantity}
                value={quantity}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={status}
                  label='Status'
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={true}>Ativo</MenuItem>
                  <MenuItem value={false}>Inativo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <InputText
                label='URL da imagem'
                placeholder='https://via.placeholder.com/400x600'
                setValue={setUrlImage}
                value={urlImage}
              />
            </Grid>
            <Grid item xs={8}>
              <Button
                variant='contained'
                sx={{ mr: 3 }}
                onClick={() => handleSubmit()}
              >
                Cadastrar Produto
              </Button>

              <Button
                variant='outlined'
                onClick={() => navigate('/admin/manageProduct')}
              >
                Voltar
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ mt: 5 }}>
              <Typography variant='h5' fontWeight={600}>
                Informações tecnicas
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Nome caracteristica *
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  // value={age}
                  label='Informações tecnicas'
                  // onChange={handleChange}
                >
                  <MenuItem value={'Marca'}>Marca</MenuItem>
                  <MenuItem value={'Fabricante'}>Fabricante</MenuItem>
                  <MenuItem value={'Tipo de Chip'}>Tipo de Chip</MenuItem>
                  <MenuItem value={'Sistema Operacional'}>
                    Sistema Operacional
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Valor caracteristica'
                placeholder='grande'
                // setValue={setUrlImage}
                // value={urlImage}
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant='contained' sx={{ height: 55 }}>
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  )
}
