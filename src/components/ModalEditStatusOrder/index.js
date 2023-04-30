import React from 'react'

import {
  Grid,
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { BLUE } from '../../utils/constants'

import api from '../../utils/api'

export default function ModalEditStatusOrder({
  handleClose,
  open,
  idOrder,
  actualStatus,
  fetchData
}) {
  const [optionsStatus, setOptionsStatus] = React.useState([])
  const [selectedStatus, setSelectedStatus] = React.useState()

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const getStatusOrder = async () => {
      const response = await api.get(`/setting/SETTING_STATUS_ORDER`)
      setOptionsStatus(response.data.metadatas)
    }
    getStatusOrder()
  }, [])

  React.useEffect(() => {
    if (actualStatus) {
      setSelectedStatus(actualStatus)
    }
  }, [actualStatus])

  const handleChange = (event) => {
    setSelectedStatus(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const body = {
        status: selectedStatus
      }

      await api.put(`/order/status/${idOrder}`, body)
      await fetchData()

      handleClose()
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
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
            Editar status pedido
          </Typography>
          <Grid container justifyContent={'center'}>
            <Grid item md={8}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Status pedido
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={selectedStatus || actualStatus}
                  label='Status pedido'
                  onChange={handleChange}
                >
                  {optionsStatus.map((item) => (
                    <MenuItem key={item._id} value={item.key}>
                      {item.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={{ margin: '8px 0' }}
                onClick={() => handleSubmit()}
                disabled={loading}
                fullWidth
              >
                {loading ? 'atualizando...' : 'Atualizar status'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}
