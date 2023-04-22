import { Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function ThankYou() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography sx={{ mt: 2, mb: 1, fontSize: 30 }}>
        <VerifiedIcon style={{ color: "green" }} />
        Obrigado por comprar, sua <br />
        compra esta sendo processada.
      </Typography>
    </div>
  );
}
