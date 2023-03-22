import React, { useEffect } from 'react'

import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

import api from '../../../../utils/api'
import Loading from '../../../../components/basicComponents/Loading'
import { toast } from 'react-toastify'
import InputText from '../../../../components/basicComponents/InputText'
import InputDate from '../../../../components/basicComponents/InputDate'

export default function UpdateUserData() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [genre, setGenre] = React.useState('')
  const [cpf, setCpf] = React.useState('')
  const [birthDate, setBirthDate] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await api.get('/user/userData')
      setName(response.data.name)
      setEmail(response.data.email)
      setCpf(response.data.cpf)
      setGenre(response.data.genre)
      setBirthDate(new Date(response.data.birthDate))
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const body = {
        name,
        email,
        genre,
        cpf,
        birthDate
      }
      const response = await api.put('/user/userData', body)
      toast(response.data.message)
    } catch (error) {
      console.log(error)
      toast(error.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid
      container
      style={{
        maxWidth: 700,
        backgroundColor: '#fff',
        padding: 50,
        borderRadius: 10,
        margin: '0 auto'
      }}
    >
      <Loading loading={loading} />
      <Grid>
        <h2>Cadastro</h2>
      </Grid>

      <InputText
        label='Nome'
        placeholder='Maria da Silva'
        setValue={setName}
        value={name}
      />

      <InputText
        style={{ margin: '8px 0' }}
        label='E-mail'
        placeholder='maria@email.com'
        setValue={setEmail}
        value={email}
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
        value={cpf}
      />

      <InputDate
        label='Data de nascimento'
        value={birthDate}
        setValue={setBirthDate}
      />

      <Button
        type='submit'
        color='primary'
        variant='contained'
        style={{ margin: '8px 0' }}
        onClick={() => handleSubmit()}
        // disabled={loading}
        fullWidth
      >
        Salvar alterações
      </Button>
    </Grid>
  )
}
