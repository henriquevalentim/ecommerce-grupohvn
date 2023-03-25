import { Card, CardContent, Grid, Typography } from '@mui/material'
import SidebarAdmin from '../../../components/SidebarAdmin'

export default function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdmin />
      <main>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
          <div style={{ marginBottom: '48px' }}>
            <Typography variant='h4' fontWeight={600}>
              Dashboard
            </Typography>
          </div>

          <Grid container spacing={3} style={{ width: '100vh' }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 50 }} gutterBottom>
                    354
                  </Typography>

                  <Typography color='text.secondary'>
                    Usuários ativos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 50 }} gutterBottom>
                    105
                  </Typography>

                  <Typography color='text.secondary'>Produtos</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 50 }} gutterBottom>
                    252.458
                  </Typography>

                  <Typography color='text.secondary'>Pedidos</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  )
}
