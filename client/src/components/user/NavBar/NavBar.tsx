import { AppBar, Avatar, Button, Container, Grid, IconButton, Toolbar, Typography,Drawer} from "@mui/material";
import { border, borderColor, Box } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import WebIcon from '@mui/icons-material/Web';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GroupIcon from '@mui/icons-material/Group';
import BoltIcon from '@mui/icons-material/Bolt';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notification = (msg:string)=>{
    toast(`⚡${msg}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    return;
}

const Navbar = () => {

    const {user} = useSelector((state:any) => state.userInfo)
    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const router = useRouter();

    const handleClick = () => {
        localStorage.removeItem('userToken');
        router.push('/auth');
    }
    return (  
        <>
        <Box>
            <ToastContainer/>
            <AppBar sx={{background:'#fff'}} elevation={0} >
                <Container maxWidth={'xl'}>
                    <Toolbar sx={{height:'70px'}}>
                    <Avatar src="https://res.cloudinary.com/dbb0ncoht/image/upload/v1677577766/img_ivfg7q.svg"/>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,ml:1,color:'black'}}>
                            MakeADay
                        </Typography>
                            <Box sx={{borderRadius:'20px', border:'1.5px solid #dedede' , display:'flex',alignItems:'center',pl:1}}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={user ? user.profile :''}
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
                                    <Link legacyBehavior href='/dashboard'>
                                        <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                                            <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                                <HomeIcon/>
                                                <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Home</h4>
                                            </Box>  
                                        </Box>
                                    </Link>
                                    <Box  sx={{backgroundColor:'#fff', borderRadius:'18px',pt:1.5,pb:1.5,mb:1,":hover":{backgroundColor:'#e8e8e8'}}}>
                                        <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                            <WebIcon/>
                                            <h4 style={{marginTop:'auto',marginLeft:'6px'}}>View Page</h4>
                                        </Box>
                                    </Box>
                                    <Link legacyBehavior href='/feeds'>
                                        <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,mt:1,":hover":{backgroundColor:'#e8e8e8'}}}>
                                            <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                                <AutoAwesomeIcon/>
                                                <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Newfeed</h4>
                                            </Box>
                                        </Box>
                                    </Link>
                                    <Link legacyBehavior href='/explore'>
                                        <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                                            <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                                <SearchIcon/>
                                                <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Explore</h4>
                                            </Box>
                                        </Box>
                                    </Link>

                                    <Link legacyBehavior href='/chat'>
                                        <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,mb:1,":hover":{backgroundColor:'#e8e8e8'}}}>
                                            <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                                <MailOutlineIcon/>
                                                <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Messaage</h4>
                                            </Box>
                                        </Box>
                                    </Link>
                                    
                                    <Link legacyBehavior href='/supporters'>
                                        <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,mb:1,mt:1,":hover":{backgroundColor:'#e8e8e8'}}}>
                                            <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                                <GroupIcon/>
                                                <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Suppoters</h4>
                                            </Box>
                                        </Box>
                                    </Link>

                                    <Link legacyBehavior href='/integration'>
                                        <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,mt:1,":hover":{backgroundColor:'#e8e8e8'}}}>
                                            <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                                <BoltIcon/>
                                                <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Integrations</h4>
                                            </Box>
                                        </Box>
                                    </Link>
                                    <Link legacyBehavior href='/wallet'>
                                        <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                                            <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                                <CurrencyExchangeIcon/>
                                                <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Payoutes</h4>
                                            </Box>
                                        </Box>
                                    </Link>
                                    <Link legacyBehavior href='/manage'>
                                        <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                                            <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                                <SettingsIcon/>
                                                <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Settings</h4>
                                            </Box>
                                        </Box>
                                    </Link>
                                    <Link legacyBehavior href='/about'>
                                        <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                                            <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                                                <InfoIcon/>
                                                <h4 style={{marginTop:'auto',marginLeft:'6px'}}>About</h4>
                                            </Box>
                                        </Box>
                                    </Link>
                                    <a onClick={handleClick}> 
                                        <Box  sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
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
 
export default Navbar;


