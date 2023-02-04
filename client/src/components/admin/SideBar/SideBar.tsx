import * as React from 'react';
import { Box } from '@mui/system';
import { Grid} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const AdminSideBar = () => {
    return ( 
        <>
           <Grid sx={{position:'fixed'}}>
              <Grid className='comp'  sx={{minWidth:'206px', minHeight: '40vw', overflowY:'scroll' , overflowX: 'hidden',}}>
                <Box sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <HomeIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Dashboard</h4>
                    </Box>  
                </Box>
                <Box mt={1} sx={{backgroundColor:'#fff', borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <PeopleAltTwoToneIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Users</h4>
                    </Box>
                </Box>
                <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <LockPersonOutlinedIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Requests</h4>
                    </Box>
                </Box>
                <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <GppMaybeOutlinedIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Report</h4>
                    </Box>
                </Box>
                <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
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
 
export default AdminSideBar;


  