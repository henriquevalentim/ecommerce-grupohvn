import React from 'react'
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link
} from '@mui/material'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

import { BLUE } from '../../utils/constants'
import api from '../../utils/api'
import TextError from '../../components/TextError'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  async function handleSubmit() {
    try {
      setLoading(true)
      const body = {
        email,
        password
      }
      console.log('body', body)
      const response = await api.post('/user/login', body)

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
          height: '50vh',
          width: 280,
          margin: '20px auto'
        }}
      >
        <Grid align='center'>
          <Avatar style={{ backgroundColor: BLUE }}></Avatar>
          <h2>login do cliente</h2>
          <TextError message={error} />
        </Grid>
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
          label='Senha'
          placeholder='********'
          type='password'
          variant='outlined'
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          style={{ margin: '8px 0' }}
          onClick={() => handleSubmit()}
          fullWidth
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Continuar'}
        </Button>
        <Typography>
          <Link href='#'>Esqueci minha senha?</Link>
        </Typography>
        <Typography>
          {' '}
          Não tem cadastro? <Link href='/cadastrar'>cadastre-se</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}
