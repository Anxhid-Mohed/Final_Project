import { Box, AppBar, Container, Toolbar, Avatar, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";


const Header = () => {

    const router = useRouter();

    return (  
        <>
        <Box>
            <AppBar sx={{background:'#fff'}} elevation={0} >
                <Container maxWidth={'xl'}>
                    <Toolbar sx={{height:'70px'}}>
                    <Avatar src="https://res.cloudinary.com/dbb0ncoht/image/upload/v1677577766/img_ivfg7q.svg"/>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,ml:1,color:'black'}}>
                            MakeADay
                        </Typography>
                            <Box sx={{borderRadius:'20px', border:'2px solid #393939' , display:'flex',alignItems:'center',width:'68px',height:'37px'}}>
                               
                                { router.pathname == '/auth' ? (
                                    <Link legacyBehavior href='/auth/signup'><Typography sx={{color:'#000',ml:'5px'}}>Sign up</Typography></Link>
                                ):(
                                    <Link legacyBehavior href='/auth'><Typography sx={{color:'#000',ml:'7px'}}>Sign in</Typography></Link>
                                )}
                               
                            </Box>
                    </Toolbar>
                </Container>  
            </AppBar>
        </Box>
        </>
    );
}
 
export default Header;