import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatPrice, limitText } from '../../utils/functions';

export default function ProductCard({ id, name, price, code, urlImage }) {
  const navigate = useNavigate();
  return (
    <Card
      key={id}
      sx={{ width: 400, margin: 2, cursor: 'pointer' }}
      onClick={() => navigate(`/product/${code}`)}
    >
      <CardMedia component="img" height="300" image={urlImage} alt={name} />
      <CardContent>
        <Tooltip title={name}>
          <Typography gutterBottom variant="h5" component="div">
            {limitText(name, 29)}
          </Typography>
        </Tooltip>
        <Typography variant="body1" color="text.primary">
          {formatPrice(price)}
        </Typography>
      </CardContent>
    </Card>
  );
}
