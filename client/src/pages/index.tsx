import { AppBar, Container, Toolbar, Avatar, Typography, Box, Grid } from '@mui/material';
import { maxWidth } from '@mui/system';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Project</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <Grid xs={12} sx={{backgroundColor:'red'}}>
          <Box sx={{
            backgroundColor:"grey",
            height:'90vh',
            // backgroundImage:"url('https://res.cloudinary.com/dbb0ncoht/image/upload/v1677590335/Banner-Images/kofi_heroimg_eoqmg0.webp')",
            // backgroundRepeat: 'no-repeat',
            // objectFit:'fill',
            backgroundSize:'cover',
            textAlign: 'center',
          }}>
          </Box>

      </Grid>
    </>
  )
}
