import React from 'react'

import { Grid, TextField, Button, Modal, Box, Typography } from '@mui/material'
// import { useAlert } from 'react-alert'
import { BLUE } from '../../utils/constants'

import apiCEP from '../../utils/apiCEP'
import api from '../../utils/api'

export default function ModalAddress({ handleClose, open, setAddress }) {
  const [name, setName] = React.useState('')
  const [street, setStreet] = React.useState('')
  const [neighborhood, setNeighborhood] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [city, setCity] = React.useState('')
  const [uf, setUF] = React.useState('')
  const [complement, setComplement] = React.useState('')
  const [zipCode, setZipCode] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  // const alert = useAlert()

  const getAddressByZipCode = async (cep) => {
    setZipCode(cep)
    const cepFormatted = cep.replace('-', '')
    if (cepFormatted.length < 8) return
    const response = await apiCEP.get(`/${cep}/json/`)
    setStreet(response.data.logradouro)
    setNeighborhood(response.data.bairro)
    setCity(response.data.localidade)
    setUF(response.data.uf)
  }

  const cleanFields = () => {
    setName('')
    setStreet('')
    setNeighborhood('')
    setNumber('')
    setCity('')
    setUF('')
    setComplement('')
    setZipCode('')
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const body = {
        name,
        zipCode,
        street,
        neighborhood,
        number,
        city,
        uf,
        complement
      }
      await api.post('/address/register', body)
      const response = await api.get('/address/user')
      setAddress(response.data)
      cleanFields()
      handleClose()
    } catch (error) {
      // alert.show('Erro ao cadastrar endereço')
    } finally {
      setLoading(false)
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: `1px solid ${BLUE}`,
    boxShadow: 10,
    borderRadius: 5,
    p: 4
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2' mb={2}>
            novo endereço
          </Typography>
          <Grid container justifyContent={'center'}>
            <Grid item md={8}>
              <TextField
                style={{ margin: '8px 0' }}
                label='Nome endereço'
                placeholder='Minha casa'
                variant='outlined'
                onChange={(e) => setName(e.target.value)}
                value={name}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{ margin: '8px 0' }}
                label='CEP'
                placeholder='08750-000'
                limit={9}
                variant='outlined'
                onChange={(e) => getAddressByZipCode(e.target.value)}
                value={zipCode}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{ margin: '8px 0' }}
                label='Rua'
                placeholder='Rua joão das couves'
                variant='outlined'
                value={street}
                disabled
                fullWidth
                required
              />
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{ margin: '8px 0' }}
                label='Numero'
                placeholder='444'
                variant='outlined'
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{ margin: '8px 0' }}
                label='Complemento'
                placeholder='Perto da praça'
                variant='outlined'
                onChange={(e) => setComplement(e.target.value)}
                value={complement}
                fullWidth
              />
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{ margin: '8px 0' }}
                label='Bairro'
                placeholder='444'
                variant='outlined'
                onChange={(e) => setNeighborhood(e.target.value)}
                value={neighborhood}
                disabled
                fullWidth
                required
              />
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{ margin: '8px 0' }}
                label='Cidade'
                placeholder='Mogi das trevas'
                variant='outlined'
                disabled
                onChange={(e) => setCity(e.target.value)}
                value={city}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={8}>
              <TextField
                style={{ margin: '8px 0' }}
                label='Estado'
                placeholder='São Paulo'
                variant='outlined'
                disabled
                onChange={(e) => setUF(e.target.value)}
                value={uf}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={6}>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={{ margin: '8px 0' }}
                onClick={() => handleSubmit()}
                disabled={loading}
                fullWidth
              >
                {loading ? 'cadastrando...' : 'cadastrar'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}
