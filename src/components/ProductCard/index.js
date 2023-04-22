import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/functions";

export default function ProductCard({ id, name, price, code, urlImage }) {
  const navigate = useNavigate();
  return (
    <Card
      key={id}
      sx={{ width: 400, margin: 2, cursor: "pointer" }}
      onClick={() => navigate(`/product/${code}`)}
    >
      <CardMedia component="img" height="300" image={urlImage} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatPrice(price)}
        </Typography>
      </CardContent>
    </Card>
  );
}
