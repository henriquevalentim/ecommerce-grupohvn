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

export default function Address() {
  const [open, setOpen] = React.useState(false)
  const [address, setAddress] = React.useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/address/user')
      console.log(response.data)
      setAddress(response.data)
    }
    fetchData()
  }, [])

  return (
    <>
      <Grid container>
        <Grid item md={10}>
          <h1>Endereços</h1>
        </Grid>
        <Grid item md={2}>
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
      <Grid container fullWidth spacing={3}>
        {address.map((item) => (
          <Grid item md={3}>
            <Card sx={{ minWidth: 350, maxWidth: 550 }}>
              <CardContent>
                <Typography variant='h4' component='div'>
                  {item.name}
                </Typography>
                <Divider />
                <Typography variant='h5'>
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
                    // onChange={handleChange}
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
