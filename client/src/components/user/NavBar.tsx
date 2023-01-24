import { AppBar, Avatar, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import { border, borderColor, Box } from "@mui/system";

const Navbar = () => {
    return (  
        <>
        <Box>
            <AppBar sx={{background:'#fff'}} elevation={1} >
                <Container maxWidth={'xl'}>
                    <Toolbar sx={{height:'70px'}}>
                        <Grid xs={12} md={12} sx={{display:'flex'}}>
                            <Grid md={6}>
                            <Avatar sx={{
                                src:'',
                                alt:'Logo'
                            }}/>
                            </Grid>
                            <Grid md={2} sx={{justifyContent:'flex-end'}} >
                                <Button >Login</Button>
                            </Grid>    
                        </Grid>
                    </Toolbar>
                </Container>  
            </AppBar>
        </Box>

        </>
    );
}
 
export default Navbar;