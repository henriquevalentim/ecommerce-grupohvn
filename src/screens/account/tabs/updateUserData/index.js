import React, { useEffect } from 'react'

import { Grid, TextField, Button } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'

import api from '../../../../utils/api'

export default function UpdateUserData() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [cpf, setCpf] = React.useState('')
  const [birthDate, setBirthDate] = React.useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/user/userData')
      setName(response.data.name)
      setEmail(response.data.email)
      setCpf(response.data.cpf)
      setBirthDate(new Date(response.data.birthDate))
    }
    fetchData()
  }, [])

  return (
    <Grid container style={{ maxWidth: 500 }}>
      <Grid>
        <h2>Cadastro</h2>
      </Grid>

      <TextField
        label='Nome'
        placeholder='Maria da Silva'
        variant='outlined'
        onChange={(e) => setName(e.target.value)}
        value={name}
        fullWidth
        required
      />
      <TextField
        style={{ margin: '8px 0' }}
        label='E-mail'
        placeholder='maria@email.com'
        variant='outlined'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        fullWidth
        required
      />
      <TextField
        style={{ margin: '8px 0' }}
        label='CPF'
        placeholder='123.456.789-00'
        variant='outlined'
        onChange={(e) => setCpf(e.target.value)}
        value={cpf}
        fullWidth
        required
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          className='fullwidth'
          label={'Data de nascimento'}
          value={birthDate}
          onChange={(e) => setBirthDate(e)}
        />
      </LocalizationProvider>

      <Button
        type='submit'
        color='primary'
        variant='contained'
        style={{ margin: '8px 0' }}
        // onClick={() => handleSubmit()}
        // disabled={loading}
        fullWidth
      >
        Salvar alterações
      </Button>
    </Grid>
  )
}
