import * as React from 'react';
import { Box } from '@mui/system';
import { Grid} from '@mui/material';
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


const SideBar = () => {
    return ( 
        <>
           <Grid sx={{display: { xs: 'none', sm: 'none', md: 'block'} }} >
              <Grid className='comp' sx={{ height: '40vw', overflowY:'scroll' , overflowX: 'hidden' }}>
                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <HomeIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Home</h4>
                    </Box>  
                </Box>
                <Box sx={{backgroundColor:'#fff', borderRadius:'18px',pt:1.5,pb:1.5,mb:1,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <WebIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>View Page</h4>
                    </Box>
                </Box>
                
                <h6>PUBLISH</h6>

                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,mt:1,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <AutoAwesomeIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Newfeed</h4>
                    </Box>
                </Box>
                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <SearchIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Explore</h4>
                    </Box>
                </Box>
                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,mb:1,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <MailOutlineIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Messaage</h4>
                    </Box>
                </Box>
                
                <h6 style={{marginLeft:'5px'}}>MY SUPPORT</h6>
                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,mb:1,mt:1,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <GroupIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Suppoters</h4>
                    </Box>
                </Box>

                <h6>SETTINGS</h6>
                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,mt:1,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <BoltIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Integrations</h4>
                    </Box>
                </Box>
                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <CurrencyExchangeIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Payoutes</h4>
                    </Box>
                </Box>
                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <SettingsIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Settings</h4>
                    </Box>
                </Box>
                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <InfoIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>About</h4>
                    </Box>
                </Box>
                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <LogoutIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Logout</h4>
                    </Box>
                </Box>

              </Grid>
              
            </Grid>
        </>
    );
}
 
export default SideBar;


  