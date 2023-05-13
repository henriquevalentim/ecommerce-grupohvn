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
import InputText from '../basicComponents/InputText'

export default function ModalGenarateLinkPayment({
  handleClose,
  open,
  userId
}) {
  const [price, setPrice] = useState([])
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true)
  //     // const response = await api.get('/address/user')
  //     // setAddress(response.data)
  //     setLoading(false)
  //   }
  //   fetchData()
  // }, [])

  const handleSubmit = async (addressId) => {
    setLoading(true)
    await api.post('/order/processLinkPayment', { userId, amount: price })
    setLoading(false)
    handleClose()
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
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
            Informe o valor do link de pagamento
          </Typography>

          <Grid item xs={4}>
            <InputText
              label='Preço'
              placeholder='R$ 458,32'
              setValue={setPrice}
              value={price}
            />
          </Grid>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              style={{ margin: '8px 0' }}
              onClick={() => handleSubmit()}
              disabled={loading}
            >
              Gerar link de pagamento
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}
