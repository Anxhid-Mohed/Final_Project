import * as React from 'react';
import { Box } from '@mui/system';
import { Grid} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Router from 'next/router';

const AdminSideBar = () => {

    const handleClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#f04f4f',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('adminToken');
                Router.push('/admin')
            }
          })
    }

    return ( 
        <>
           <Grid sx={{position:'fixed'}}>
              <Grid className='comp'  sx={{minWidth:'206px', minHeight: '40vw', overflowY:'scroll' , overflowX: 'hidden',}}>
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
                <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <GppMaybeOutlinedIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Report</h4>
                    </Box>
                </Box>
                <a onClick={handleClick}>
                <Box mt={1} sx={{backgroundColor:'#fff' , borderRadius:'18px',pt:1.5,pb:1.5,":hover":{backgroundColor:'#e8e8e8'}}}>
                    <Box sx={{ml:2,display:'flex',color:'#333232'}}>
                        <LogoutIcon/>
                        <h4 style={{marginTop:'auto',marginLeft:'6px'}}>Logout</h4>
                    </Box>
                </Box>
                </a>
              </Grid>
              
            </Grid>
        </>
    );
}
 
export default AdminSideBar;


  