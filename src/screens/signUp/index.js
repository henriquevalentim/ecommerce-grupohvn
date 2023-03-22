import React from 'react'
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material'
import { BLUE } from '../../utils/constants'
import jwt_decode from 'jwt-decode'
import api from '../../utils/api'
import TextError from '../../components/TextError'
import { useNavigate } from 'react-router-dom'
import InputDate from '../../components/basicComponents/InputDate'
import InputText from '../../components/basicComponents/InputText'

export default function SignUp() {
  const navigate = useNavigate()

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [genre, setGenre] = React.useState('')
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
        confirmPassword,
        genre
      }

      const response = await api.post('/user/register', body)

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

        <InputText
          style={{ margin: '8px 0' }}
          label='Nome'
          placeholder='Maria da Silva'
          setValue={setName}
        />

        <InputText
          style={{ margin: '8px 0' }}
          label='E-mail'
          placeholder='maria@email.com'
          setValue={setEmail}
        />

        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Genero</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={genre}
            label='Genero'
            onChange={(e) => setGenre(e.target.value)}
          >
            <MenuItem value={''}>Não informar</MenuItem>
            <MenuItem value={'M'}>Masculino</MenuItem>
            <MenuItem value={'F'}>Feminino</MenuItem>
          </Select>
        </FormControl>

        <InputText
          style={{ margin: '8px 0' }}
          label='CPF'
          placeholder='123.456.789-00'
          setValue={setCpf}
        />

        <InputDate label={'Data de nascimento'} setValue={setBirthDate} />

        <InputText
          style={{ margin: '8px 0' }}
          label='Senha'
          placeholder='********'
          type='password'
          setValue={setPassword}
        />

        <InputText
          label='Confirmar senha'
          placeholder='********'
          type='password'
          setValue={setConfirmPassword}
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
