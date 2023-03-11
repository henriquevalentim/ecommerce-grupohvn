import React from 'react'
import { Grid, Paper, TextField, Button, Typography, Link } from '@mui/material'
import { BLUE } from '../../utils/constants'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'

export default function SignUp() {
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
        </Grid>

        <TextField
          style={{ margin: '8px 0' }}
          label='Nome'
          placeholder='Maria da Silva'
          variant='outlined'
          fullWidth
          required
        />
        <TextField
          style={{ margin: '8px 0' }}
          label='E-mail'
          placeholder='maria@email.com'
          variant='outlined'
          fullWidth
          required
        />
        <TextField
          style={{ margin: '8px 0' }}
          label='CPF'
          placeholder='123.456.789-00'
          variant='outlined'
          fullWidth
          required
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker className='fullwidth' label={'Data de nascimento'} />
        </LocalizationProvider>
        <TextField
          style={{ margin: '8px 0' }}
          label='Senha'
          placeholder='********'
          variant='outlined'
          fullWidth
          required
        />

        <TextField
          label='Confirmar senha'
          placeholder='********'
          type='password'
          variant='outlined'
          fullWidth
          required
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          style={{ margin: '8px 0' }}
          fullWidth
        >
          cadastrar
        </Button>
        <Typography>
          {' '}
          Já tem conta? <Link href='#'>Entrar</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}
