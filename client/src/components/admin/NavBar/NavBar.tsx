import { AppBar, Avatar, Button, Container, Grid, IconButton, Toolbar, Typography,Drawer} from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {

    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const router = useRouter();

    const handleClick = () => {
        localStorage.removeItem('adminToken');
        router.push('/auth');
    }
    return (  

        <>
        <Box>
            <AppBar sx={{background:'#fff'}} elevation={0} >
                <Container maxWidth={'xl'}>
                    <Toolbar sx={{height:'70px'}}>
                        <Avatar src="https://res.cloudinary.com/dbb0ncoht/image/upload/v1677577766/img_ivfg7q.svg"/>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,ml:1,color:'black'}}>
                            Admin-Panel
                        </Typography>
                        <Box sx={{borderRadius:'20px', border:'1.5px solid #dedede' , display:'flex',alignItems:'center',pl:1}}>
                            <Avatar
                                alt=""
                                src="https://res.cloudinary.com/dbb0ncoht/image/upload/v1677577766/img_ivfg7q.svg"
                                sx={{ width: 25, height: 25 }}
                            />
                            <IconButton onClick={()=>setDrawerOpen(true)}>
                                <MenuIcon/>
                            </IconButton>
                        </Box>
                        <Drawer 
                            anchor="right"
                            open={drawerOpen}
                            onClose={()=>setDrawerOpen(false)}
                        >
                            <Box p={2} mt={5} width="250px" textAlign="center" role="presentation">
                                <Link legacyBehavior href='/admin/dashboard'>
                                    <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                                        <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                            <HomeIcon/>
                                            <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Dashboard</h4>
                                        </Box>  
                                    </Box>
                                </Link>
                                <Link legacyBehavior href='/admin/users'>
                                    <Box mt={1} sx={{backgroundColor:'#fff', borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                                        <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                            <PeopleAltTwoToneIcon/>
                                            <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Users</h4>
                                        </Box>
                                    </Box>
                                </Link>
                                <Link legacyBehavior href='/admin/requests'>
                                    <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                                        <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                            <LockPersonOutlinedIcon/>
                                            <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Requests</h4>
                                        </Box>
                                    </Box>
                                </Link>
                                <Link legacyBehavior href='/admin/reports'>
                                    <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                                        <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                            <GppMaybeOutlinedIcon/>
                                            <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Report</h4>
                                        </Box>
                                    </Box>
                                </Link>
                                <a onClick={handleClick}>
                                    <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                                        <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                            <LogoutIcon/>
                                            <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Logout</h4>
                                        </Box>
                                    </Box>
                                </a>
                            </Box>
                        </Drawer>
                    </Toolbar>
                </Container>  
            </AppBar>
        </Box>

        </>
    );
}
 
export default NavBar;