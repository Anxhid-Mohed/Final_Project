import React, { useEffect } from "react";
import { getAllCreaters } from '@/Apis/userApi/userPageRequests';
import { AppBar, Container, Toolbar, Avatar, Typography, Box, Grid, Button } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Explore.module.css';
import ProfileCard from "@/components/user/ProfileCard/ProfileCard";
import {useRouter} from "next/router";


function Copyright(props:any) {
  return (
    <Typography my={3} variant="body2" color="text.secondary" align="center" {...props}>
      {'By signing up, you agree to our terms and privacy policy. You must be at least 18 years old to start a page.'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Home() {

  const [creaters, setCreaters] = React.useState([])
  const router = useRouter()

  useEffect(()=>{
    (
        async ()=> {
            const response = await getAllCreaters()
            if(response.status === true){
                setCreaters(response.data);
                console.log(response.data);
            }
        }
    )()
  },[])
  return (
    <>
      <Head>
        <title>Project</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <Container maxWidth={false}  sx={{ maxWidth: '2000px'}}>
        <Box>
          <AppBar sx={{background:'#fff',mb:5}} elevation={0} >
              <Container maxWidth={'xl'}>
                  <Toolbar sx={{height:'70px'}}>
                  <Avatar src="https://res.cloudinary.com/dbb0ncoht/image/upload/v1677577766/img_ivfg7q.svg"/>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,ml:1,color:'black'}}>
                          MakeADay
                      </Typography>
                        <Box sx={{borderRadius:'20px', border:'2px',display:'flex',alignItems:'center',justifyContent:'center',width:'100px',height:'37px',mr:5}}>
                          <Link legacyBehavior href='/auth'><Typography sx={{color:'#000',fontWeight:'700'}}>Sign in</Typography></Link> 
                        </Box>
                        <Box sx={{borderRadius:'20px', border:'2px',display:'flex',backgroundColor:'#eb1e44',alignItems:'center',justifyContent:'center',width:'100px',height:'37px'}}>
                          <Link legacyBehavior href='/auth/signup'><Typography sx={{color:'#fff'}}>Sign up</Typography></Link>
                        </Box>
                  </Toolbar>
              </Container>  
          </AppBar>
        </Box>
        <Grid item mt={10} xs={12}>
          <Box sx={{textAlign:'center'}}>
            <Typography  sx={{fontSize:{lg:'60px',md:'50px',sm:'40px',xs:'30px'},fontWeight:600,color:'rgba(34, 34, 34,1)'}}>
              A supporter is worth a <br /> thousand followers.
            </Typography>
            <Typography sx={{fontSize:'20px',fontWeight:500,color:'rgba(34, 34, 34,1)'}}>
              Accept donations. Sell your skill. It’s easier than you think.
            </Typography>
              <Button
                onClick={()=>router.push('/auth/signup')}
                variant="contained"
                sx={{
                    mt: 2,
                    mb: 2,
                    borderRadius: "20px",
                    height: "42px",
                    backgroundColor: "#eb1e44",
                    "&:hover": { backgroundColor: "#eb1e44"},
                    textTransform: "none",
                    fontWeight:600
                }}
            >
              Start my page
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{
          height:'94vh',
          backgroundImage:"url('https://res.cloudinary.com/dbb0ncoht/image/upload/v1677590335/Banner-Images/kofi_heroimg_eoqmg0.webp')",
          backgroundSize:'100%',
          backgroundRepeat: 'no-repeat',
          textAlign: 'center',
          objectFit:'cover',
          width: '97%',
          mt:{sm:-4,md:-10,lg:-15,}
        }}>
        </Grid>
        <Grid item xs={12} sx={{fontSize:{lg:'50px',md:'40px',sm:'30px',xs:'25px'},textAlign:'center',fontWeight:800,color:'rgba(34, 34, 34,1)'}}> Top Creators</Grid>
        <Grid mt={3} xs={12} p={5} sx={{borderRadius:'15px',border:'1px solid #dedede',lineBreak:'auto',justifyContent:'center'}}>
          <Box p={2} className={styles.scrollBar} sx={{
              display:'-webkit-box',
              overflowX:'scroll',
              overflowY:'hidden',
              WebkitScrollSnapType:'none',
              WebkitOverflowScrolling:'touch', 
          }}>

          {
            creaters
              .slice(0,10)
              .map((creater:any)=>{
              return(
                  <ProfileCard key={creater._id} data={creater}/>
              )
            })   
          }
          </Box>
        </Grid>
        <Copyright/>
      </Container>
    </>
  )
}
