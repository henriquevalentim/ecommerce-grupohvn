import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'

export default function ProductCard({
  name,
  description,
  price,
  urlImage,
  key
}) {
  return (
    <Card key={key} sx={{ width: 400, margin: 2 }}>
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
        <Button color='primary' variant='contained'>
          Comprar
        </Button>
      </CardActions>
    </Card>
  )
}
