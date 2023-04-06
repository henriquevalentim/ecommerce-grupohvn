import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ id, name, price, code, urlImage }) {
  const navigate = useNavigate()
  return (
    <Card key={id} sx={{ width: 400, margin: 2 }}>
      <CardMedia component='img' height='300' image={urlImage} alt={name} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        {/* <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button
          color='primary'
          variant='contained'
          onClick={() => navigate(`/product/${code}`)}
        >
          Comprar
        </Button>
      </CardActions>
    </Card>
  )
}
