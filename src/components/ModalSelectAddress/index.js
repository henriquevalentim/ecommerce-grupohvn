import React from 'react'

import {
  Grid,
  Button,
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  CardActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import { BLUE } from '../../utils/constants'

import api from '../../utils/api'
import { useEffect } from 'react'
import { useState } from 'react'

export default function ModalSelectAddress({
  handleClose,
  open,
  setMainAddress
}) {
  const [address, setAddress] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await api.get('/address/user')
      setAddress(response.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const setMainAddressById = async (addressId) => {
    setLoading(true)
    await api.put('/address/setMainAddress', { addressId })
    const response = await api.get('/address/user')
    setAddress(response.data)
    const findedAddress = response.data.find((item) => item.isMain)
    setMainAddress(findedAddress)
    setLoading(false)
    handleClose()
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: `1px solid ${BLUE}`,
    boxShadow: 10,
    borderRadius: 5,
    p: 4
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2' mb={2}>
            Escolha o endereço
          </Typography>

          <Grid
            container
            spacing={2}
            style={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            {address.map((item) => (
              <Grid item md={4}>
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
                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby='demo-controlled-radio-buttons-group'
                        name='controlled-radio-buttons-group'
                        value={JSON.stringify(item.isMain)}
                        onClick={() => setMainAddressById(item._id)}
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

          <Grid
            item
            md={12}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              type='submit'
              color='primary'
              variant='contained'
              style={{ margin: '8px 0' }}
              // onClick={() => handleSubmit()}
              disabled={loading}
            >
              Adicionar novo endereço
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}
