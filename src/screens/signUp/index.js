import React from 'react'
import { Grid, Paper, TextField, Button, Typography, Link } from '@mui/material'
import { BLUE } from '../../utils/constants'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import jwt_decode from 'jwt-decode'
import api from '../../utils/api'
import TextError from '../../components/TextError'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const navigate = useNavigate()

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [cpf, setCpf] = React.useState('')
  const [birthDate, setBirthDate] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  async function handleSubmit() {
    try {
      setLoading(true)
      const body = {
        name,
        email,
        cpf,
        birthDate,
        password,
        confirmPassword
      }

      const response = await api.post('/user', body)

      const decode = jwt_decode(response.data.token)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('email', decode.email)
      localStorage.setItem('name', decode.name)
      localStorage.setItem('id', decode.id)

      navigate('/')
    } catch (error) {
      console.log('error', error.response.data.message)
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      style={{ backgroundColor: BLUE, height: '100vh' }}
    >
      <Paper
        elevation={10}
        style={{
          padding: 30,
          height: '60vh',
          width: 350,
          margin: '20px auto'
        }}
      >
        <Grid align='center'>
          <h2>Cadastrar</h2>
          <TextError message={error} />
        </Grid>

        <TextField
          style={{ margin: '8px 0' }}
          label='Nome'
          placeholder='Maria da Silva'
          variant='outlined'
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          style={{ margin: '8px 0' }}
          label='E-mail'
          placeholder='maria@email.com'
          variant='outlined'
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          style={{ margin: '8px 0' }}
          label='CPF'
          placeholder='123.456.789-00'
          variant='outlined'
          onChange={(e) => setCpf(e.target.value)}
          fullWidth
          required
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            className='fullwidth'
            label={'Data de nascimento'}
            onChange={(e) => setBirthDate(e)}
          />
        </LocalizationProvider>
        <TextField
          style={{ margin: '8px 0' }}
          label='Senha'
          placeholder='********'
          type='password'
          variant='outlined'
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label='Confirmar senha'
          placeholder='********'
          type='password'
          variant='outlined'
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          required
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          style={{ margin: '8px 0' }}
          onClick={() => handleSubmit()}
          disabled={loading}
          fullWidth
        >
          {loading ? 'Carregando...' : 'cadastrar'}
        </Button>
        <Typography>
          {' '}
          Já tem conta? <Link href='/login'>Entrar</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}
