/* eslint-disable react/no-unescaped-entities */
import Navbar from "@/components/user/NavBar/NavBar";
import SideBar from "@/components/user/SideBar/SideBar";
import { Alert, Box, Grid, Modal, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { HiOutlineExclamationCircle } from "react-icons/hi2"
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { accountDelete, accountDisable, accountEnable } from "@/Apis/userApi/userManagement";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '@/redux/userSlice';
import { useEffect, useState } from "react";
import { tokenVerification } from "@/Apis/userApi/userAuthRequest";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius:'10px',
    boxShadow: 24,
    p: 4,
};
  

const About = () => {
    const { user } = useSelector((state:any)=>state.userInfo)
    const dispatch = useDispatch();

    useEffect(()=>{
        let token = localStorage.getItem('userToken')
        if(token){
           (
                async () => {

                    const response = await tokenVerification(token);
                    console.log(response);
                    
                    if(response?.status === false || response?.isBanned === true){
                        router.push('/auth')
                    }else if (response?.isAuthenticated  && response?.isBanned === false){
                        dispatch(userDetails(response))
                        console.log(response);
                        
                    }
                }
            )()
        }else{
          router.push('/auth')
        }
    },[])
    
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDisabled = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            customClass: 'swal-wide',
            confirmButtonColor: '#6aba4d',
            cancelButtonColor: '#ee5252db',
            confirmButtonText: 'Yes, approve it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                let token = localStorage.getItem('userToken');
                
                if(token){
                    console.log(token);
                    const response = await accountDisable(token);
                    if(response.status == true){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your account disabled now',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                    router.push('/auth')
                }
            }
        })
    };

    const handleEnable = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            customClass: 'swal-wide',
            confirmButtonColor: '#6aba4d',
            cancelButtonColor: '#ee5252db',
            confirmButtonText: 'Yes, Undisable',
        }).then(async (result) => {
            if (result.isConfirmed) {
                let token = localStorage.getItem('userToken');
                
                if(token){
                    console.log(token);
                    const response = await accountEnable(token);
                    if(response.status === true){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your account enabled now',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                    router.push('/auth')
                }
            }
        })
    };


    const handleSubmit = async () =>{
        console.log(password);
        let token = localStorage.getItem('userToken');
        if(token){
            const response = await accountDelete(password,token);
            console.log(response);
            if(response.status === true){
                Swal.fire({
                    position: 'center',
                    icon:'success',
                    title: 'Your account deleted now',
                    showConfirmButton: false,
                    timer: 1000
                })
                localStorage.removeItem('userToken');
                router.push('/auth')

            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.message,
                })
            }
        }
        
    }

    const styles = {fontSize:'1.5rem',marginLeft:'5px', color:' rgba(238,82,82,.8)'}
    return (  
        <>
           <Navbar/>
            <Container>
                <Grid item container sx={{display:'flex',mt:11}}>
                    <Grid item md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }} >
                        <SideBar userData={user?.username} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9.5} sx={{lineBreak:'auto'}}>
                        <Container maxWidth='lg'>
                            <Grid item xs={12} sx={{width:'100%'}}>
                                <h3 style={{marginTop:'14px',fontWeight:'800'}}>About</h3>
                                { user?.disabled === true  && <Alert sx={{marginTop:'10px',backgroundColor:'#dee0df'}} severity="info">This is an info alert — Your Account currently disabled !</Alert> }
                                <Grid item mt={3} mb={2} xs={12}  p={3.5}  sx={{borderRadius:'12px',border:'1px solid rgba(238,82,82,.5)',lineBreak:'auto',backgroundColor:'#fef6f6'}}>
                                    <Grid item xs={12}>
                                        <h3>Disable Account</h3>
                                    </Grid>
                                    <Box mt={2} sx={{display:{xs:'block' ,sm:'flex' ,md:'flex'}}}>
                                        <Grid item xs={12} sm={9} md={9} sx={{width:'100%'}}>
                                            <Typography sx={{lineBreak:'auto',color:'#717171',fontSize:'16px'}} letterSpacing={1}>
                                            Your account will be temporarily deactivated and will not be accessible publicly.
                                            You will be logged out in the process, and the page will be re-activated when you login again.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3} md={3} sx={{width:'100%',textAlign:{xs:'-moz-initial',sm:'end',md:'end'}}}>
                                        { user?.disabled === false  ?
                                          <Button  
                                            onClick={handleDisabled}
                                            sx={{
                                                backgroundColor:'#ee5252',
                                                "&:hover": { backgroundColor: "#ee5252"},
                                                textTransform: 'none',
                                                borderRadius: 3,
                                                fontWeight:'bold',
                                                color:'#fff',
                                                width:{sm:'8.1rem',md:'8.2rem'},
                                            }}
                                        >
                                               Disable
                                        </Button> :
                                             <Button  
                                             onClick={handleEnable}
                                             sx={{
                                                 backgroundColor:'#ee5252',
                                                 "&:hover": { backgroundColor: "#ee5252"},
                                                 textTransform: 'none',
                                                 borderRadius: 3,
                                                 fontWeight:'bold',
                                                 color:'#fff',
                                                 width:{sm:'8.1rem',md:'8.2rem'},
                                             }}
                                             >
                                                 Enable now
                                             </Button>
                                        }    
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item mt={3} mb={2} xs={12}  p={3.5}  sx={{borderRadius:'15px',border:'1px solid rgba(238,82,82,.5)',lineBreak:'auto',backgroundColor:'#fef6f6'}}>
                                    <Grid item xs={12} sx={{display:'flex'}}>
                                        <h3>Delete Account</h3>
                                        <HiOutlineExclamationCircle style={styles}/>
                                    </Grid>
                                    <Box mt={2} sx={{display:{xs:'block' ,sm:'flex' ,md:'flex'}}}>
                                        <Grid item xs={12} sm={9} md={9} sx={{width:'100%'}}>
                                            <Typography sx={{lineBreak:'auto',color:'#717171',fontSize:'16px'}} letterSpacing={1}>
                                            Are you absolutely sure that you want to delete your account ?.
                                            If you click the button we will required to put your password for confirm your account deletion proccess
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3} md={3} sx={{width:'100%',textAlign:{xs:'-moz-initial',sm:'end',md:'end'}}}>
                                            <Button  
                                            onClick={handleOpen}
                                            sx={{
                                                backgroundColor:'#ee5252',
                                                "&:hover": { backgroundColor: "#ee5252"},
                                                textTransform: 'none',
                                                borderRadius: 3,
                                                fontWeight:'bold',
                                                color:'#fff',
                                                width:{sm:'8.1rem',md:'8.2rem'},
                                            }}
                                            >
                                                Delete
                                            </Button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Type your password here 
                                                </Typography>
                                                <Box mt={2}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    value={password}
                                                    onChange={(e)=>setPassword(e.target.value)}
                                                    type="password"
                                                    id="name"
                                                    autoComplete="new-password"
                                                    sx={{
                                                        "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                        "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                        '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                    }}
                                                 />
                                                    <Button
                                                        onClick={handleSubmit}
                                                        fullWidth
                                                        type="submit"
                                                        variant="contained"
                                                        sx={{
                                                            mt: 1,
                                                            mb: 2,
                                                            borderRadius: "15px",
                                                            height: "42px",
                                                            backgroundColor: "#eb1e44",
                                                            "&:hover": { backgroundColor: "#eb1e44"},
                                                            textTransform: "none",
                                                        }}
                                                    >
                                                    Continue
                                                    </Button>
                                                </Box>
                                                </Box>
                                            </Modal>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
 
export default About;

function userState(arg0: boolean): [any, any] {
    throw new Error("Function not implemented.");
}
