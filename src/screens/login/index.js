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
import { BLUE } from '../../utils/constants'

export default function Login() {
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
        </Grid>
        <TextField
          style={{ margin: '8px 0' }}
          label='E-mail'
          placeholder='maria@email.com'
          variant='outlined'
          fullWidth
          required
        />
        <TextField
          label='Senha'
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
          continuar
        </Button>
        <Typography>
          <Link href='#'>Esqueci minha senha?</Link>
        </Typography>
        <Typography>
          {' '}
          Não tem cadastro? <Link href='#'>cadastre-se</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}
