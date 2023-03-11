import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'

export default function ProductCard({ name, description, price, image_url }) {
  return (
    <Card sx={{ width: 400, margin: 2 }}>
      <CardMedia component='img' height='300' image={image_url} alt={name} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color='primary' variant='contained'>
          Comprar
        </Button>
      </CardActions>
    </Card>
  )
}
