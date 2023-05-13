import { useState, useEffect } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { Delete } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

import SidebarAdmin from '../../../components/SidebarAdmin'
import api from '../../../utils/api'
import Loading from '../../../components/basicComponents/Loading'
import ModalGenarateLinkPayment from '../../../components/ModalGenarateLinkPayment'

import InputText from '../../../components/basicComponents/InputText'

export default function ProfileUser() {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [genre, setGenre] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [registerDate, setRegisterDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (state) {
      const { user = '' } = state
      setId(user._id)
      setName(user.name)
      setCpf(user.cpf)
      setEmail(user.email)
      setBirthDate(user.birthDate)
      setRegisterDate(user.registerDate)
      if (user.genre === 'M') {
        setGenre('Masculino')
      } else {
        setGenre('Feminino')
      }
    }
  }, [state])

  const handleClose = () => {
    setOpen(false)
  }

  const goToBack = async () => {
    try {
      navigate('/admin/manageUser')
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
              Perfil usuário
            </Typography>
          </div>
          <Grid
            container
            spacing={2}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <ModalGenarateLinkPayment
              handleClose={handleClose}
              open={open}
              userId={id}
            />
            <Grid item xs={2}>
              <Button
                variant='contained'
                sx={{ height: 55, mb: 2 }}
                onClick={() => setOpen(true)}
              >
                Criar link de pagamento
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputText
                label='ID'
                placeholder='123456'
                setValue={setId}
                value={id}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Nome'
                placeholder='Henrique'
                setValue={setName}
                value={name}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='e-mail'
                placeholder='henrique@gmail.com'
                setValue={setEmail}
                value={email}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Cpf'
                placeholder='123.456.789-10'
                setValue={setCpf}
                value={cpf}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Gênero'
                placeholder='Masculino'
                setValue={setGenre}
                value={genre}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Data de Nascimento'
                placeholder='24/09/1996'
                setValue={setBirthDate}
                value={birthDate}
                disabled={true}
              />
            </Grid>
            <Grid item xs={4}>
              <InputText
                label='Data de registro'
                placeholder='10/10/2020'
                setValue={setRegisterDate}
                value={registerDate}
                disabled={true}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='contained'
              sx={{ height: 55 }}
              onClick={() => goToBack()}
            >
              Voltar
            </Button>
          </Grid>
        </div>
      </main>
    </div>
  )
}
