import {useEffect, useState} from 'react';
import { Box, Button, Collapse, Container, FormControl, Grid, InputLabel, ListItem, ListItemIcon, ListItemText, MenuItem, Modal, Select, SelectChangeEvent, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import {FcIdea,FcCurrencyExchange,FcLikePlaceholder,FcBullish} from 'react-icons/fc/';
import {IoChevronDown} from 'react-icons/io5';
import ProfilePage from "../ProfilePage/Profile";
import { createrRequest } from '@/Apis/userApi/userRequests';
import router from 'next/router';
import { tokenVerification } from '@/Apis/userApi/userAuthRequest';
import React from 'react';

function Copyright(props:any) {
    return (
      <Typography my={3} variant="body2" color="text.secondary" align="center" {...props}>
        {'By signing up, you agree to our terms and privacy policy. You must be at least 18 years old to start a page.'}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs:355,sm:400,md:400},
    bgcolor: 'background.paper',
    borderRadius:'10px',
    boxShadow: 24,
    p: 4,
};

const names = [
    'Programmer',
    'gamer',
    'Bloger',
    'story publisher',
    'gamer',
    'Bloger',
    'story publisher',
 ];

  

const HomePage = () => {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [opens, setOpens] = useState(false);
    const [category, setCategory] = useState('');

    const handleOpen = () => setOpens(true);
    const handleClose = () => setOpens(false);
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    useEffect(()=>{
        let token = localStorage.getItem('userToken')
        if(token){
           (
                async () => {

                    const response = await tokenVerification(token);
                    if(response.status == false){
                        router.push('/auth')
                    }else if (response.isAuthenticated){
                        router.push('/dashboard') 
                    }
                }
            )()
        }else{
          router.push('/auth')
        }
    },[])

    const handleSubmit = async () => {
        console.log(category);
        let token = localStorage.getItem('userToken') as string;
        const response = await createrRequest(category,token);
        if(response.status == true){
            //toast
        }
    }

    const style = { fontSize: "1.6em"}
    return (  
        <>
            <Container maxWidth='lg' >
                <Grid xs={12} sx={{width:'100%'}}>
                    <h3 style={{marginTop:'14px',fontWeight:'800'}}>Home Page</h3>

                    <Grid mt={3} xs={12}>
                        <Stack sx={{ width: '100%' ,textAlign:'center'}} spacing={2}>
                            <Alert
                                iconMapping={{
                                success: <CheckCircleOutlineIcon fontSize="inherit" />,
                                }}
                            >
                                Your official creater now...
                            </Alert>
                        </Stack>
                    </Grid>

                    <ProfilePage />
                    
                    <Grid mt={3} xs={12}  p={3} boxShadow={1} sx={{borderRadius:'15px',border:'1px solid #dedede',lineBreak:'anywhere'}}>
                        <Box sx={{display:'flex',alignItems:'center'}}>
                            <FcIdea style={style}/>
                            <h3 style={{marginLeft:'5px'}}>Creator !</h3>
                        </Box>

                        <Grid mt={1} xs={12}>
                            <Typography>If you want to become a creator... ?</Typography>
                            <Typography sx={{fontSize:'15px',color:'#4e4f4f',fontWeight:'500'}}>
                                You needs permission to access the creaters features in yours account that only an admins  can grand.
                                Please ask an admin to grand permission :)
                            </Typography>
                            <Box>
                                <Button onClick={handleOpen} sx={{
                                    backgroundColor:'#a2fc8d',
                                    "&:hover": { backgroundColor: "#a2fc8d"},
                                    textTransform: 'none',
                                    borderRadius: 3,
                                    color:'#000',
                                    mt:2,
                                    width:{sm:'8.1rem',md:'8.2rem'},
                                    }}>
                                    Request
                                </Button>
                                <Modal
                                    open={opens}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={styles}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                           Request form 
                                        </Typography>
                                        <Box mt={2} sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                                                <Select 
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={category}
                                                    label="Caregories"
                                                    onChange={handleChange}
                                                    MenuProps={MenuProps}
                                                >
                                                    {names.map((name) =>(
                                                        <MenuItem key={name} value={name}>
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Typography mt={1} sx={{fontSize:'14px',color:'#4e4f4f'}}>
                                           Admin may take time for your request approval
                                        </Typography>
                                        <Button fullWidth onClick={handleSubmit}>
                                            Send
                                        </Button>
                                    </Box>
                                </Modal>
                            </Box>

                        </Grid>         
                    </Grid>
                    
                    <Grid mt={3} xs={12}  p={3} boxShadow={1} sx={{borderRadius:'15px',border:'1px solid #dedede'}}>

                            <h3 style={{marginLeft:'5px'}}>Guides here</h3>
    
                            <Grid p={4} mt={2} sx={{borderRadius:'15px',border:'1px solid #dedede'}}>
                                <Box mb={1} sx={{display:'flex',alignItems:'center',cursor:'pointer'}} onClick={()=>setOpen(!open)}>
                                    <FcCurrencyExchange style={style}/>
                                    <Typography ml={2} sx={{fontSize:{sx:'10px',sm:'0.8rem'}}}> More ways to earn</Typography>
                                    <IoChevronDown style={{marginLeft: 'auto'}}/>
                                </Box>
                                    {open && <h5>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</h5>}
                            </Grid>
                            <Grid p={4} mt={2} sx={{borderRadius:'15px',border:'1px solid #dedede'}}>
                                <Box mb={1} sx={{display:'flex',alignItems:'center',cursor:'pointer'}} onClick={()=>setOpen1(!open1)}>
                                    <FcLikePlaceholder style={style}/>
                                    <Typography ml={2} sx={{fontSize:{sx:'10px',sm:'0.8rem'}}}>Make more suppoters</Typography>
                                    <IoChevronDown style={{marginLeft: 'auto'}}/>
                                </Box>
                                    {open1 && <h5>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</h5>}
                            </Grid>
                            <Grid p={4} mt={2} sx={{borderRadius:'15px',border:'1px solid #dedede'}}>
                                <Box mb={1} sx={{display:'flex',alignItems:'center',cursor:'pointer'}} onClick={()=>setOpen2(!open2)}>
                                    <FcBullish style={style}/>
                                    <Typography ml={2} sx={{fontSize:{sm:'0.7rem'}}}>Scale your account</Typography>
                                    <IoChevronDown style={{marginLeft: 'auto'}}/>
                                </Box>
                                    {open2 && <h5>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</h5>}
                            </Grid>
                    </Grid>
                    <Copyright/>
                </Grid>

            </Container>
        </>
    );
}
 
export default HomePage;