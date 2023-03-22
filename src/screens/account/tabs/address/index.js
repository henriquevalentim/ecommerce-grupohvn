import React, { useEffect } from 'react'

import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Divider,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup
} from '@mui/material'

import api from '../../../../utils/api'
import ModalAddress from '../../../../components/ModalAddress'
import Loading from '../../../../components/basicComponents/Loading'

export default function Address() {
  const [open, setOpen] = React.useState(false)
  const [address, setAddress] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const setMainAddress = async (addressId) => {
    setLoading(true)
    await api.put('/address/setMainAddress', { addressId })
    const response = await api.get('/address/user')
    setAddress(response.data)
    setLoading(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await api.get('/address/user')
      setAddress(response.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <>
      <Loading loading={loading} />
      <Grid container style={{ width: '100%' }}>
        <Grid item md={8}>
          <h1>Endereços</h1>
        </Grid>
        <Grid item md={4}>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            style={{ margin: '8px 0' }}
            onClick={() => handleOpen()}
            fullWidth
          >
            Adicionar novo endereço
          </Button>
        </Grid>
      </Grid>
      <ModalAddress
        handleClose={handleClose}
        open={open}
        setAddress={setAddress}
      />
      <Grid
        container
        spacing={2}
        style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {address.map((item) => (
          <Grid item md={5}>
            <Card sx={{ minWidth: 350, maxWidth: 550 }}>
              <CardContent>
                <Typography variant='h5' component='div'>
                  {item.name}
                </Typography>
                <Divider />
                <Typography variant='h6'>
                  {item.street}, {item.number}
                  <br />
                  {item.neighborhood}, {item.city} - {item.uf}
                  <br />
                  CEP: {item.zipCode}
                </Typography>
              </CardContent>
              <CardActions>
                <FormControl>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={JSON.stringify(item.isMain)}
                    onClick={() => setMainAddress(item._id)}
                  >
                    <FormControlLabel
                      value={'true'}
                      control={<Radio />}
                      label='endereço principal'
                    />
                  </RadioGroup>
                </FormControl>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
