import { Button, Typography } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import { useNavigate } from 'react-router-dom'

export default function ThankYou() {
  const navigate = useNavigate()

  const redirectToOrders = () => {
    navigate('/profile')
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
      }}
    >
      <div>
        <Typography sx={{ mt: 2, mb: 1, fontSize: 30 }}>
          <VerifiedIcon style={{ color: 'green' }} />
          Obrigado por comprar, sua <br />
          compra esta sendo processada.
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' onClick={redirectToOrders}>
            Ir para meus pedidos
          </Button>
        </div>
      </div>
    </div>
  )
}
